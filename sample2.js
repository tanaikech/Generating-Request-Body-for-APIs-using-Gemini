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
