class GenerateRequestBody {
  constructor() {
    /** @private */
    this.service;
  }

  /**
   * @typedef {Object} ApiResourceIds
   * @property {string} [documentId] - The ID of the Google Document.
   * @property {string} [spreadsheetId] - The ID of the Google Spreadsheet.
   * @property {string} [presentationId] - The ID of the Google Presentation.
   */

  /**
   * @typedef {Object} GenerateRequestBodyParams
   * @property {string} apiKey - The API key for the Gemini API.
   * @property {string} prompt - The prompt to generate the request body.
   * @property {Object} jsonSchema - The JSON schema for the request body.
   * @property {ApiResourceIds} resourceIds - The IDs of the Google Workspace resources.
   * @property {number} [retry=5] - The number of times to retry on failure.
   * @property {string[]} [refUrls=[]] - Reference URLs.
   */

  /**
   * Determines the Google Workspace service details based on the provided resource IDs.
   *
   * @param {ApiResourceIds} resourceIds - The IDs of the Google Workspace resources.
   * @private
   */
  getApiService_({ documentId, spreadsheetId, presentationId }) {
    if (documentId) {
      this.service = { batchUpdate: Docs.Documents.batchUpdate, resourceId: documentId, serviceName: "Docs" };
      return;
    } else if (spreadsheetId) {
      this.service = { batchUpdate: Sheets.Spreadsheets.batchUpdate, resourceId: spreadsheetId, serviceName: "Sheets" };
      return;
    } else if (presentationId) {
      this.service = { batchUpdate: Slides.Presentations.batchUpdate, resourceId: presentationId, serviceName: "Slides" };
      return;
    }
    throw new Error("No valid resource ID provided.");
  }

  /**
   * Get blobs from URLs.
   *
   * @param {string[]} refUrls - Reference URLs.
   * @returns {GoogleAppsScript.Base.Blob[]}
   * @private
   */
  getBlobs_(refUrls = []) {
    if (refUrls.length === 0) {
      return [];
    }
    const requests = refUrls.map(url => ({ url, muteHttpExceptions: true }));
    return UrlFetchApp.fetchAll(requests).reduce((blobs, response, i) => {
      if (response.getResponseCode() === 200) {
        const blob = response.getBlob().setContentType(MimeType.HTML).getAs(MimeType.PDF).setName(refUrls[i]);
        blobs.push(blob);
      }
      return blobs;
    }, []);
  }

  /**
   * Builds the system instruction for the Gemini API.
   *
   * @param {string} serviceName - The name of the Google Workspace service.
   * @param {Object} jsonSchema - The JSON schema for the request body.
   * @returns {Object} The system instruction object.
   * @private
   */
  buildSystemInstruction_(serviceName, jsonSchema) {
    return {
      parts: [{
        text: [
          `You are an expert in creating request bodies for the batchUpdate method of the Google ${serviceName} API.`,
          "Your task is to create a request body based on the user's prompt.",
          "The JSON schema for the request body is as follows. Ensure your response adheres to this schema.",
          `<JSONSchema>${JSON.stringify(jsonSchema)}</JSONSchema>`,
        ].join("\n"),
      }],
    };
  }

  /**
   * Executes the Gemini API chat request and handles retries.
   *
   * @param {GeminiWithFiles} g - The GeminiWithFiles instance.
   * @param {string} initialPrompt - The initial prompt.
   * @param {number} retry - The number of retry attempts.
   * @returns {Object} The generated request body.
   * @private
   */
  executeChatWithRetry_(g, initialPrompt, retry) {
    let currentPrompt = initialPrompt;

    for (let i = 0; i < retry; i++) {
      console.log(`Attempt: ${i + 1}`);
      console.log(`Prompt: ${currentPrompt}`);
      try {
        const res = g.chat({ parts: [{ text: currentPrompt }], role: "user" });
        const part = res.candidates[0]?.content?.parts?.find(e => e.text);

        if (part?.text) {
          const requestBody = JSON.parse(part.text);
          if (requestBody.requests && Array.isArray(requestBody.requests) && requestBody.requests.length > 0) {
            this.service.batchUpdate(requestBody, this.service.resourceId);
            console.log("Successfully executed batchUpdate.");
            return requestBody;
          }
        }
        currentPrompt = "The previous attempt failed to generate a valid request body. Please try again.";
      } catch (e) {
        console.error(`An error occurred: ${e.message}`);
        currentPrompt = `An error occurred with the generated request body: "${e.message}". Please update the request body to fix this error.`;
      }
    }

    throw new Error(`Failed to generate a valid request body after ${retry} attempts.`);
  }

  /**
   * Generates a request body for Google Workspace APIs using the Gemini API.
   *
   * @param {GenerateRequestBodyParams} params - The parameters for generating the request body.
   * @returns {Object} The generated request body object.
   */
  generateRequestBody({ apiKey, prompt, jsonSchema, resourceIds, retry = 5, refUrls = [] }) {
    if (!apiKey || !prompt || !jsonSchema || !resourceIds) {
      throw new Error("Invalid arguments provided. Please check the required parameters.");
    }

    this.getApiService_(resourceIds);
    const { serviceName } = this.service;

    const systemInstruction = this.buildSystemInstruction_(serviceName, jsonSchema);

    const g = new GeminiWithFiles.geminiWithFiles({ apiKey, systemInstruction, responseMimeType: "application/json" });

    if (refUrls.length > 0) {
      const blobs = this.getBlobs_(refUrls);
      if (blobs.length > 0) {
        const fileList = g.setBlobs(blobs).uploadFiles();
        g.withUploadedFilesByGenerateContent(fileList);
      }
    }

    return this.executeChatWithRetry_(g, prompt, retry);
  }
}