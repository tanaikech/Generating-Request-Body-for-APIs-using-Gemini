const apiKey = "###"; // Replace with your actual API key

/**
 * Tests the generation of a request body for Google Docs.
 */
function test_GoogleDocs() {
  const prompt = `Insert the text "sample text" at the beginning of the document. Color the word "sample" red and the word "text" blue.`;
  const resourceIds = { documentId: "###" }; // Please set your ID.
  try {
    const res = new GenerateRequestBody().generateRequestBody({ apiKey, prompt, jsonSchema: jsonSchemaForDocs, resourceIds });
    console.log(JSON.stringify(res, null, 2));
  } catch (error) {
    console.error(error.message);
  }
}

/**
 * Tests the generation of a request body for Google Sheets.
 */
function test_GoogleSheets() {
  const prompt = `In the sheet named 'Sheet1' (with a sheet ID of 0), insert the text "sample text" into cell A1. Color the word "sample" red and the word "text" blue.`;
  const resourceIds = { spreadsheetId: "###" }; // Please set your ID.
  try {
    const res = new GenerateRequestBody().generateRequestBody({ apiKey, prompt, jsonSchema: jsonSchemaForSheets, resourceIds });
    console.log(JSON.stringify(res, null, 2));
  } catch (error) {
    console.error(error.message);
  }
}

/**
 * Tests the generation of a request body for Google Slides.
 */
function test_GoogleSlides() {
  const prompt = `On the first slide (ID 'p'), create a new text box and insert "sample text". Color the word "sample" red and the word "text" blue.`;
  const resourceIds = { presentationId: "###" }; // Please set your ID.
  try {
    const res = new GenerateRequestBody().generateRequestBody({ apiKey, prompt, jsonSchema: jsonSchemaForSlides, resourceIds });
    console.log(JSON.stringify(res, null, 2));
  } catch (error) {
    console.error(error.message);
  }
}
