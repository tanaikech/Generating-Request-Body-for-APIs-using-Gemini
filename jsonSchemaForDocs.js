const jsonSchemaForDocs = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Google Docs API batchUpdate Request Body",
  "description": "A list of updates to apply to the document.",
  "type": "object",
  "properties": {
    "requests": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/Request"
      }
    },
    "writeControl": {
      "$ref": "#/definitions/WriteControl"
    }
  },
  "required": [
    "requests"
  ],
  "definitions": {
    "Request": {
      "type": "object",
      "oneOf": [
        { "properties": { "replaceAllText": { "$ref": "#/definitions/ReplaceAllTextRequest" } } },
        { "properties": { "insertText": { "$ref": "#/definitions/InsertTextRequest" } } },
        { "properties": { "updateTextStyle": { "$ref": "#/definitions/UpdateTextStyleRequest" } } },
        { "properties": { "createParagraphBullets": { "$ref": "#/definitions/CreateParagraphBulletsRequest" } } },
        { "properties": { "deleteParagraphBullets": { "$ref": "#/definitions/DeleteParagraphBulletsRequest" } } },
        { "properties": { "createNamedRange": { "$ref": "#/definitions/CreateNamedRangeRequest" } } },
        { "properties": { "deleteNamedRange": { "$ref": "#/definitions/DeleteNamedRangeRequest" } } },
        { "properties": { "updateParagraphStyle": { "$ref": "#/definitions/UpdateParagraphStyleRequest" } } },
        { "properties": { "deleteContentRange": { "$ref": "#/definitions/DeleteContentRangeRequest" } } },
        { "properties": { "insertInlineImage": { "$ref": "#/definitions/InsertInlineImageRequest" } } },
        { "properties": { "insertTable": { "$ref": "#/definitions/InsertTableRequest" } } },
        { "properties": { "insertTableRow": { "$ref": "#/definitions/InsertTableRowRequest" } } },
        { "properties": { "insertTableColumn": { "$ref": "#/definitions/InsertTableColumnRequest" } } },
        { "properties": { "deleteTableRow": { "$ref": "#/definitions/DeleteTableRowRequest" } } },
        { "properties": { "deleteTableColumn": { "$ref": "#/definitions/DeleteTableColumnRequest" } } },
        { "properties": { "insertPageBreak": { "$ref": "#/definitions/InsertPageBreakRequest" } } },
        { "properties": { "deletePositionedObject": { "$ref": "#/definitions/DeletePositionedObjectRequest" } } },
        { "properties": { "updateTableColumnProperties": { "$ref": "#/definitions/UpdateTableColumnPropertiesRequest" } } },
        { "properties": { "updateTableCellStyle": { "$ref": "#/definitions/UpdateTableCellStyleRequest" } } },
        { "properties": { "updateTableRowStyle": { "$ref": "#/definitions/UpdateTableRowStyleRequest" } } },
        { "properties": { "replaceImage": { "$ref": "#/definitions/ReplaceImageRequest" } } },
        { "properties": { "updateDocumentStyle": { "$ref": "#/definitions/UpdateDocumentStyleRequest" } } },
        { "properties": { "mergeTableCells": { "$ref": "#/definitions/MergeTableCellsRequest" } } },
        { "properties": { "unmergeTableCells": { "$ref": "#/definitions/UnmergeTableCellsRequest" } } },
        { "properties": { "createHeader": { "$ref": "#/definitions/CreateHeaderRequest" } } },
        { "properties": { "createFooter": { "$ref": "#/definitions/CreateFooterRequest" } } },
        { "properties": { "createFootnote": { "$ref": "#/definitions/CreateFootnoteRequest" } } },
        { "properties": { "replaceNamedRangeContent": { "$ref": "#/definitions/ReplaceNamedRangeContentRequest" } } },
        { "properties": { "updateSectionStyle": { "$ref": "#/definitions/UpdateSectionStyleRequest" } } },
        { "properties": { "insertSectionBreak": { "$ref": "#/definitions/InsertSectionBreakRequest" } } },
        { "properties": { "deleteHeader": { "$ref": "#/definitions/DeleteHeaderRequest" } } },
        { "properties": { "deleteFooter": { "$ref": "#/definitions/DeleteFooterRequest" } } },
        { "properties": { "pinTableHeaderRows": { "$ref": "#/definitions/PinTableHeaderRowsRequest" } } }
      ]
    },
    "ReplaceAllTextRequest": {
      "type": "object",
      "properties": {
        "replaceText": { "type": "string" },
        "containsText": { "$ref": "#/definitions/SubstringMatchCriteria" },
        "tabsCriteria": { "$ref": "#/definitions/TabsCriteria" }
      }
    },
    "InsertTextRequest": {
      "type": "object",
      "properties": {
        "text": { "type": "string" },
        "location": { "$ref": "#/definitions/Location" },
        "endOfSegmentLocation": { "$ref": "#/definitions/EndOfSegmentLocation" }
      }
    },
    "UpdateTextStyleRequest": {
      "type": "object",
      "properties": {
        "textStyle": { "type": "object" },
        "fields": { "type": "string" },
        "range": { "$ref": "#/definitions/Range" }
      }
    },
    "CreateParagraphBulletsRequest": {
      "type": "object",
      "properties": {
        "range": { "$ref": "#/definitions/Range" },
        "bulletPreset": { "type": "string" }
      }
    },
    "DeleteParagraphBulletsRequest": {
      "type": "object",
      "properties": {
        "range": { "$ref": "#/definitions/Range" }
      }
    },
    "CreateNamedRangeRequest": {
      "type": "object",
      "properties": {
        "name": { "type": "string" },
        "range": { "$ref": "#/definitions/Range" }
      }
    },
    "DeleteNamedRangeRequest": {
      "type": "object",
      "properties": {
        "name": { "type": "string" },
        "namedRangeId": { "type": "string" },
        "tabsCriteria": { "$ref": "#/definitions/TabsCriteria" }
      }
    },
    "UpdateParagraphStyleRequest": {
      "type": "object",
      "properties": {
        "paragraphStyle": { "type": "object" },
        "fields": { "type": "string" },
        "range": { "$ref": "#/definitions/Range" }
      }
    },
    "DeleteContentRangeRequest": {
      "type": "object",
      "properties": {
        "range": { "$ref": "#/definitions/Range" }
      }
    },
    "InsertInlineImageRequest": {
      "type": "object",
      "properties": {
        "uri": { "type": "string" },
        "objectSize": { "$ref": "#/definitions/Size" },
        "location": { "$ref": "#/definitions/Location" },
        "endOfSegmentLocation": { "$ref": "#/definitions/EndOfSegmentLocation" }
      }
    },
    "InsertTableRequest": {
      "type": "object",
      "properties": {
        "rows": { "type": "integer" },
        "columns": { "type": "integer" },
        "location": { "$ref": "#/definitions/Location" },
        "endOfSegmentLocation": { "$ref": "#/definitions/EndOfSegmentLocation" }
      }
    },
    "InsertTableRowRequest": {
      "type": "object",
      "properties": {
        "tableCellLocation": { "$ref": "#/definitions/TableCellLocation" },
        "insertBelow": { "type": "boolean" }
      }
    },
    "InsertTableColumnRequest": {
      "type": "object",
      "properties": {
        "tableCellLocation": { "$ref": "#/definitions/TableCellLocation" },
        "insertRight": { "type": "boolean" }
      }
    },
    "DeleteTableRowRequest": {
      "type": "object",
      "properties": {
        "tableCellLocation": { "$ref": "#/definitions/TableCellLocation" }
      }
    },
    "DeleteTableColumnRequest": {
      "type": "object",
      "properties": {
        "tableCellLocation": { "$ref": "#/definitions/TableCellLocation" }
      }
    },
    "InsertPageBreakRequest": {
      "type": "object",
      "properties": {
        "location": { "$ref": "#/definitions/Location" },
        "endOfSegmentLocation": { "$ref": "#/definitions/EndOfSegmentLocation" }
      }
    },
    "DeletePositionedObjectRequest": {
      "type": "object",
      "properties": {
        "objectId": { "type": "string" },
        "tabId": { "type": "string" }
      }
    },
    "UpdateTableColumnPropertiesRequest": {
      "type": "object",
      "properties": {
        "tableStartLocation": { "$ref": "#/definitions/Location" },
        "columnIndices": { "type": "array", "items": { "type": "integer" } },
        "tableColumnProperties": { "type": "object" },
        "fields": { "type": "string" }
      }
    },
    "UpdateTableCellStyleRequest": {
      "type": "object",
      "properties": {
        "tableCellStyle": { "type": "object" },
        "fields": { "type": "string" },
        "tableRange": { "$ref": "#/definitions/TableRange" },
        "tableStartLocation": { "$ref": "#/definitions/Location" }
      }
    },
    "UpdateTableRowStyleRequest": {
      "type": "object",
      "properties": {
        "tableStartLocation": { "$ref": "#/definitions/Location" },
        "rowIndices": { "type": "array", "items": { "type": "integer" } },
        "tableRowStyle": { "type": "object" },
        "fields": { "type": "string" }
      }
    },
    "ReplaceImageRequest": {
      "type": "object",
      "properties": {
        "imageObjectId": { "type": "string" },
        "uri": { "type": "string" },
        "imageReplaceMethod": { "type": "string" },
        "tabId": { "type": "string" }
      }
    },
    "UpdateDocumentStyleRequest": {
      "type": "object",
      "properties": {
        "documentStyle": { "type": "object" },
        "fields": { "type": "string" },
        "tabId": { "type": "string" }
      }
    },
    "MergeTableCellsRequest": {
      "type": "object",
      "properties": {
        "tableRange": { "$ref": "#/definitions/TableRange" }
      }
    },
    "UnmergeTableCellsRequest": {
      "type": "object",
      "properties": {
        "tableRange": { "$ref": "#/definitions/TableRange" }
      }
    },
    "CreateHeaderRequest": {
      "type": "object",
      "properties": {
        "type": { "type": "string" },
        "sectionBreakLocation": { "$ref": "#/definitions/Location" }
      }
    },
    "CreateFooterRequest": {
      "type": "object",
      "properties": {
        "type": { "type": "string" },
        "sectionBreakLocation": { "$ref": "#/definitions/Location" }
      }
    },
    "CreateFootnoteRequest": {
      "type": "object",
      "properties": {
        "location": { "$ref": "#/definitions/Location" },
        "endOfSegmentLocation": { "$ref": "#/definitions/EndOfSegmentLocation" }
      }
    },
    "ReplaceNamedRangeContentRequest": {
      "type": "object",
      "properties": {
        "namedRangeName": { "type": "string" },
        "namedRangeId": { "type": "string" },
        "text": { "type": "string" },
        "tabsCriteria": { "$ref": "#/definitions/TabsCriteria" }
      }
    },
    "UpdateSectionStyleRequest": {
      "type": "object",
      "properties": {
        "range": { "$ref": "#/definitions/Range" },
        "sectionStyle": { "type": "object" },
        "fields": { "type": "string" }
      }
    },
    "InsertSectionBreakRequest": {
      "type": "object",
      "properties": {
        "sectionType": { "type": "string" },
        "location": { "$ref": "#/definitions/Location" },
        "endOfSegmentLocation": { "$ref": "#/definitions/EndOfSegmentLocation" }
      }
    },
    "DeleteHeaderRequest": {
      "type": "object",
      "properties": {
        "headerId": { "type": "string" },
        "tabId": { "type": "string" }
      }
    },
    "DeleteFooterRequest": {
      "type": "object",
      "properties": {
        "footerId": { "type": "string" },
        "tabId": { "type": "string" }
      }
    },
    "PinTableHeaderRowsRequest": {
      "type": "object",
      "properties": {
        "tableStartLocation": { "$ref": "#/definitions/Location" },
        "pinnedHeaderRowsCount": { "type": "integer" }
      }
    },
    "SubstringMatchCriteria": {
      "type": "object",
      "properties": {
        "text": { "type": "string" },
        "matchCase": { "type": "boolean" }
      },
      "required": ["text"]
    },
    "Location": {
      "type": "object",
      "properties": {
        "segmentId": { "type": "string" },
        "index": { "type": "integer" },
        "tabId": { "type": "string" }
      }
    },
    "EndOfSegmentLocation": {
      "type": "object",
      "properties": {
        "segmentId": { "type": "string" },
        "tabId": { "type": "string" }
      }
    },
    "Range": {
      "type": "object",
      "properties": {
        "segmentId": { "type": "string" },
        "startIndex": { "type": "integer" },
        "endIndex": { "type": "integer" },
        "tabId": { "type": "string" }
      }
    },
    "Size": {
      "type": "object",
      "properties": {
        "height": { "$ref": "#/definitions/Dimension" },
        "width": { "$ref": "#/definitions/Dimension" }
      }
    },
    "Dimension": {
      "type": "object",
      "properties": {
        "magnitude": { "type": "number" },
        "unit": { "type": "string" }
      }
    },
    "TableCellLocation": {
      "type": "object",
      "properties": {
        "tableStartLocation": { "$ref": "#/definitions/Location" },
        "rowIndex": { "type": "integer" },
        "columnIndex": { "type": "integer" }
      }
    },
    "TableRange": {
      "type": "object",
      "properties": {
        "tableCellLocation": { "$ref": "#/definitions/TableCellLocation" },
        "rowSpan": { "type": "integer" },
        "columnSpan": { "type": "integer" }
      }
    },
    "TabsCriteria": {
      "type": "object",
      "properties": {
        "tabIds": {
          "type": "array",
          "items": { "type": "string" }
        }
      }
    },
    "WriteControl": {
      "type": "object",
      "properties": {
        "requiredRevisionId": { "type": "string" },
        "targetRevisionId": { "type": "string" }
      }
    }
  }
};