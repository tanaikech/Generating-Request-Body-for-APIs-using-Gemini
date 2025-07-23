# Generating Request Body for APIs using Gemini

<a name="top"></a>
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENCE)

<a name="abstract"></a>

![](images/fig1.jpg)

## Abstract

Effortlessly generate API request bodies from natural language commands. This guide demonstrates using Gemini and Google Apps Script to streamline automation and accelerate development for Google Workspace APIs and beyond.

## Introduction

In a recent article, "[Managing Google Docs, Sheets, and Slides by Natural Language with Gemini CLI and MCP](https://medium.com/google-cloud/managing-google-docs-sheets-and-slides-by-natural-language-with-gemini-cli-and-mcp-62f4dfbef2d5)," I showcased a powerful method for dynamically creating API request bodies using natural language. This approach, utilizing the Gemini CLI and a My Custom Proxy (MCP) server, allows users to manage Google Workspace applications with simple, human-readable commands. The core concept is that generating API request bodies directly from natural language within a script can dramatically streamline automation and development.

This capability is especially valuable for developers working with Google APIs, as evidenced by frequent questions on Stack Overflow about constructing request bodies for Google Docs, Sheets, and Slides. Building on this, the following report introduces a straightforward sample script using Google Apps Script to achieve this functionality. This method is highly versatile and can be extended to various other APIs beyond Google's ecosystem. While the example uses Google Apps Script, the methodology is language-agnostic and can be implemented in other languages like Python, Node.js, or Java. Ultimately, this innovative approach aims to accelerate script development and empower users to build more intuitive and efficient automation solutions.

## Repository

The complete source code and related resources are available in the following repository:

[https://github.com/tanaikech/Generating-Request-Body-for-APIs-using-Gemini](https://github.com/tanaikech/Generating-Request-Body-for-APIs-using-Gemini)

## Prerequisites

Before you begin, ensure you have the following:

1.  **Gemini API Key**: You will need an API key to access the Gemini API. You can obtain one from the [Google AI for Developers](https://ai.google.dev/gemini-api/docs/api-key) page.
2.  **Google Apps Script Project**: Create a new standalone Google Apps Script project. For guidance, refer to the [official documentation](https://developers.google.com/apps-script/guides/projects#create-standalone).
3.  **GeminiWithFiles Library**: Install the `GeminiWithFiles` Google Apps Script library. This library simplifies the use of the Gemini API. You can find installation instructions on the [GeminiWithFiles GitHub page](https://github.com/tanaikech/GeminiWithFiles?tab=readme-ov-file#3-how-to-use-geminiwithfiles).
4.  **JSON Schema of Request Body**: Prepare the JSON schemas that define the structure of the API request bodies. These schemas are crucial for guiding Gemini in generating the correct output. You can find pre-made JSON schemas for the `batchUpdate` methods of Docs, Sheets, and Slides in the repository:
    *   [jsonSchemaForDocs](https://github.com/tanaikech/Generating-Request-Body-for-APIs-using-Gemini/blob/master/jsonSchemaForDocs.js)
    *   [jsonSchemaForSheets](https://github.com/tanaikech/Generating-Request-Body-for-APIs-using-Gemini/blob/master/jsonSchemaForSheets.js)
    *   [jsonSchemaForSlides](https://github.com/tanaikech/Generating-Request-Body-for-APIs-using-Gemini/blob/master/jsonSchemaForSlides.js)

## Usage

### Sample Script

Copy and paste the following Google Apps Script code into your project's script editor.

This is the main class object for generating the request body.

```javascript
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
```

The following functions test the `GenerateRequestBody` class. **Remember to replace the placeholder values for `apiKey`, `documentId`, `spreadsheetId`, and `presentationId` with your actual credentials.**

Each of the `test_GoogleDocs`, `test_GoogleSheets`, and `test_GoogleSlides` functions generates a request body to insert the text "sample text" where "sample" is red and "text" is blue, and then executes the request using the `batchUpdate` method.

Please use each JSON schema.

```javascript
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
```

For more complex requests where the script may struggle to generate a valid request body, you can provide reference URLs for additional context. The following example demonstrates how to create a table in Google Docs by providing a relevant link. I have confirmed that this script successfully generates a valid request body, although it may require several attempts.

```javascript
function test_GoogleDocs2() {
  const refUrls = ["https://tanaikech.github.io/2019/05/22/creating-new-table-and-putting-values-to-cells-using-google-docs-api-with-google-apps-script/"];
  const prompt = [
    `Insert a table with 2 rows and 3 columns at the beginning of the document (child index is 1.) with the following values. 1st Row: "A1", "B1", "C1" in columns. 2nd Row: "A2", "B2", "C2" in columns.`,
    `Generate the request body by referencing the uploaded text files.`,
  ].join("\n");
  const resourceIds = { documentId: "###" }; // Please set your ID.
  try {
    const res = new GenerateRequestBody().generateRequestBody({ apiKey, prompt, jsonSchema: jsonSchemaForDocs, resourceIds, refUrls });
    console.log(JSON.stringify(res, null, 2));
  } catch (error) {
    console.error(error.message);
  }
}
```

### Testing

The function `test_GoogleDocs` generated the following request body for the batchUpdate method of Docs API.

```json
{
  "requests": [
    {
      "insertText": {
        "location": {
          "index": 1
        },
        "text": "sample text"
      }
    },
    {
      "updateTextStyle": {
        "range": {
          "startIndex": 1,
          "endIndex": 7
        },
        "textStyle": {
          "foregroundColor": {
            "color": {
              "rgbColor": {
                "red": 1,
                "green": 0,
                "blue": 0
              }
            }
          }
        },
        "fields": "foregroundColor"
      }
    },
    {
      "updateTextStyle": {
        "range": {
          "startIndex": 8,
          "endIndex": 12
        },
        "textStyle": {
          "foregroundColor": {
            "color": {
              "rgbColor": {
                "red": 0,
                "green": 0,
                "blue": 1
              }
            }
          }
        },
        "fields": "foregroundColor"
      }
    }
  ]
}
```

The function `test_GoogleDocs2` generated the following request body for the batchUpdate method of Docs API.

```json
{
  "requests": [
    {
      "insertTable": {
        "rows": 2,
        "columns": 3,
        "location": {
          "index": 1
        }
      }
    },
    {
      "insertText": {
        "text": "C2",
        "location": {
          "index": 16
        }
      }
    },
    {
      "insertText": {
        "text": "B2",
        "location": {
          "index": 14
        }
      }
    },
    {
      "insertText": {
        "text": "A2",
        "location": {
          "index": 12
        }
      }
    },
    {
      "insertText": {
        "text": "C1",
        "location": {
          "index": 9
        }
      }
    },
    {
      "insertText": {
        "text": "B1",
        "location": {
          "index": 7
        }
      }
    },
    {
      "insertText": {
        "text": "A1",
        "location": {
          "index": 5
        }
      }
    }
  ]
}
```

The function `test_GoogleSheets` generated the following request body for the batchUpdate method of Sheets API.

```json
{
  "requests": [
    {
      "updateCells": {
        "start": {
          "sheetId": 0,
          "rowIndex": 0,
          "columnIndex": 0
        },
        "rows": [
          {
            "values": [
              {
                "userEnteredValue": {
                  "stringValue": "sample text"
                },
                "textFormatRuns": [
                  {
                    "startIndex": 0,
                    "format": {
                      "foregroundColor": {
                        "red": 1,
                        "green": 0,
                        "blue": 0
                      }
                    }
                  },
                  {
                    "startIndex": 6,
                    "format": {
                      "foregroundColor": {
                        "red": 0,
                        "green": 0,
                        "blue": 1
                      }
                    }
                  }
                ]
              }
            ]
          }
        ],
        "fields": "userEnteredValue,textFormatRuns"
      }
    }
  ]
}
```

The function `test_GoogleSlides` generated the following request body for the batchUpdate method of Slides API.

```json
{
  "requests": [
    {
      "createShape": {
        "objectId": "myTextBoxId",
        "shapeType": "TEXT_BOX",
        "elementProperties": {
          "pageObjectId": "p",
          "size": {
            "width": {
              "magnitude": 2857500,
              "unit": "EMU"
            },
            "height": {
              "magnitude": 476250,
              "unit": "EMU"
            }
          },
          "transform": {
            "scaleX": 1,
            "scaleY": 1,
            "shearX": 0,
            "shearY": 0,
            "translateX": 100000,
            "translateY": 100000,
            "unit": "EMU"
          }
        }
      }
    },
    {
      "insertText": {
        "objectId": "myTextBoxId",
        "text": "sample text",
        "insertionIndex": 0
      }
    },
    {
      "updateTextStyle": {
        "objectId": "myTextBoxId",
        "textRange": {
          "type": "FIXED_RANGE",
          "startIndex": 0,
          "endIndex": 6
        },
        "style": {
          "foregroundColor": {
            "opaqueColor": {
              "rgbColor": {
                "red": 1,
                "green": 0,
                "blue": 0
              }
            }
          }
        },
        "fields": "foregroundColor"
      }
    },
    {
      "updateTextStyle": {
        "objectId": "myTextBoxId",
        "textRange": {
          "type": "FIXED_RANGE",
          "startIndex": 7,
          "endIndex": 11
        },
        "style": {
          "foregroundColor": {
            "opaqueColor": {
              "rgbColor": {
                "red": 0,
                "green": 0,
                "blue": 1
              }
            }
          }
        },
        "fields": "foregroundColor"
      }
    }
  ]
}
```

## Summary

*   **Natural Language to API Requests**: This method allows you to generate complex API request bodies using simple, human-like instructions.
*   **Powered by Gemini**: The core of this solution utilizes the Gemini API to interpret natural language prompts and produce structured JSON output.
*   **Versatile and Extensible**: While the examples focus on Google Workspace APIs (Docs, Sheets, Slides), the approach can be adapted for any API that accepts a JSON request body.
*   **Language-Agnostic Methodology**: The underlying concept can be implemented in various programming languages, not just Google Apps Script.
*   **Accelerated Development**: By automating the creation of request bodies, developers can significantly speed up their workflow and build automation scripts more efficiently.

---

<a name="licence"></a>

# Licence

[MIT](LICENCE)

<a name="author"></a>

# Author

[Tanaike](https://tanaikech.github.io/about/)

[Donate](https://tanaikech.github.io/donate/)

<a name="updatehistory"></a>

# Update History

- v1.0.0 (July 23, 2025)

  1. Initial release.

[TOP](#top)
