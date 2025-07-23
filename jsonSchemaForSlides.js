const jsonSchemaForSlides = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Google Slides API batchUpdate Request",
  "description": "A list of requests to be applied to the presentation.",
  "type": "object",
  "properties": {
    "requests": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/Request"
      }
    },
    "writeControl": {
      "type": "object",
      "properties": {
        "requiredRevisionId": {
          "type": "string"
        }
      }
    }
  },
  "required": [
    "requests"
  ],
  "definitions": {
    "Request": {
      "oneOf": [
        { "$ref": "#/definitions/CreateSlideRequest" },
        { "$ref": "#/definitions/CreateShapeRequest" },
        { "$ref": "#/definitions/CreateTableRequest" },
        { "$ref": "#/definitions/InsertTextRequest" },
        { "$ref": "#/definitions/InsertTableRowsRequest" },
        { "$ref": "#/definitions/InsertTableColumnsRequest" },
        { "$ref": "#/definitions/DeleteTableRowRequest" },
        { "$ref": "#/definitions/DeleteTableColumnRequest" },
        { "$ref": "#/definitions/ReplaceAllTextRequest" },
        { "$ref": "#/definitions/DeleteObjectRequest" },
        { "$ref": "#/definitions/UpdatePageElementTransformRequest" },
        { "$ref": "#/definitions/UpdateSlidesPositionRequest" },
        { "$ref": "#/definitions/DeleteTextRequest" },
        { "$ref": "#/definitions/CreateImageRequest" },
        { "$ref": "#/definitions/CreateVideoRequest" },
        { "$ref": "#/definitions/CreateSheetsChartRequest" },
        { "$ref": "#/definitions/CreateLineRequest" },
        { "$ref": "#/definitions/RefreshSheetsChartRequest" },
        { "$ref": "#/definitions/UpdateShapePropertiesRequest" },
        { "$ref": "#/definitions/UpdateImagePropertiesRequest" },
        { "$ref": "#/definitions/UpdateVideoPropertiesRequest" },
        { "$ref": "#/definitions/UpdatePagePropertiesRequest" },
        { "$ref": "#/definitions/UpdateTableCellPropertiesRequest" },
        { "$ref": "#/definitions/UpdateLinePropertiesRequest" },
        { "$ref": "#/definitions/CreateParagraphBulletsRequest" },
        { "$ref": "#/definitions/ReplaceAllShapesWithImageRequest" },
        { "$ref": "#/definitions/DuplicateObjectRequest" },
        { "$ref": "#/definitions/UpdateTextStyleRequest" },
        { "$ref": "#/definitions/ReplaceAllShapesWithSheetsChartRequest" },
        { "$ref": "#/definitions/DeleteParagraphBulletsRequest" },
        { "$ref": "#/definitions/UpdateParagraphStyleRequest" },
        { "$ref": "#/definitions/UpdateTableBorderPropertiesRequest" },
        { "$ref": "#/definitions/UpdateTableColumnPropertiesRequest" },
        { "$ref": "#/definitions/UpdateTableRowPropertiesRequest" },
        { "$ref": "#/definitions/MergeTableCellsRequest" },
        { "$ref": "#/definitions/UnmergeTableCellsRequest" },
        { "$ref": "#/definitions/GroupObjectsRequest" },
        { "$ref": "#/definitions/UngroupObjectsRequest" },
        { "$ref": "#/definitions/UpdatePageElementAltTextRequest" },
        { "$ref": "#/definitions/ReplaceImageRequest" },
        { "$ref": "#/definitions/UpdateSlidePropertiesRequest" },
        { "$ref": "#/definitions/UpdatePageElementsZOrderRequest" },
        { "$ref": "#/definitions/UpdateLineCategoryRequest" },
        { "$ref": "#/definitions/RerouteLineRequest" }
      ]
    },
    "CreateSlideRequest": {
      "type": "object",
      "properties": {
        "createSlide": {
          "type": "object",
          "properties": {
            "objectId": { "type": "string" },
            "insertionIndex": { "type": "integer" },
            "slideLayoutReference": { "type": "object" },
            "placeholderIdMappings": { "type": "array", "items": { "type": "object" } }
          }
        }
      }
    },
    "CreateShapeRequest": {
      "type": "object",
      "properties": {
        "createShape": {
          "type": "object",
          "properties": {
            "objectId": { "type": "string" },
            "shapeType": { "type": "string", "enum": ["TYPE_UNSPECIFIED", "TEXT_BOX", "RECTANGLE", "ROUND_RECTANGLE", "ELLIPSE", "ARC", "BENT_ARROW", "BENT_UP_ARROW", "BEVEL", "BLOCK_ARC", "BRACE_PAIR", "BRACKET_PAIR", "CAN", "CHEVRON", "CHORD", "CLOUD", "CORNER", "CUBE", "CURVED_DOWN_ARROW", "CURVED_LEFT_ARROW", "CURVED_RIGHT_ARROW", "CURVED_UP_ARROW", "DECAGON", "DIAMOND", "DODECAGON", "DONUT", "DOUBLE_WAVE", "DOWN_ARROW", "DOWN_ARROW_CALLOUT", "FOLDED_CORNER", "FRAME", "HALF_FRAME", "HEART", "HEPTAGON", "HEXAGON", "HOME_PLATE", "HORIZONTAL_SCROLL", "IRREGULAR_SEAL_1", "IRREGULAR_SEAL_2", "LEFT_ARROW", "LEFT_ARROW_CALLOUT", "LEFT_BRACE", "LEFT_BRACKET", "LEFT_RIGHT_ARROW", "LEFT_RIGHT_ARROW_CALLOUT", "LEFT_RIGHT_UP_ARROW", "LEFT_UP_ARROW", "LIGHTNING_BOLT", "MATH_DIVIDE", "MATH_EQUAL", "MATH_MINUS", "MATH_MULTIPLY", "MATH_NOT_EQUAL", "MATH_PLUS", "MOON", "NO_SMOKING", "NOTCHED_RIGHT_ARROW", "OCTAGON", "PARALLELOGRAM", "PENTAGON", "PIE", "PLAQUE", "PLUS", "QUAD_ARROW", "QUAD_ARROW_CALLOUT", "RIBBON", "RIBBON_2", "RIGHT_ARROW", "RIGHT_ARROW_CALLOUT", "RIGHT_BRACE", "RIGHT_BRACKET", "ROUND_1_RECTANGLE", "ROUND_2_DIAG_RECTANGLE", "ROUND_2_SAME_RECTANGLE", "RIGHT_TRIANGLE", "SMILEY_FACE", "SNIP_1_RECTANGLE", "SNIP_2_DIAG_RECTANGLE", "SNIP_2_SAME_RECTANGLE", "SNIP_ROUND_RECTANGLE", "STAR_10", "STAR_12", "STAR_16", "STAR_24", "STAR_32", "STAR_4", "STAR_5", "STAR_6", "STAR_7", "STAR_8", "STRIPED_RIGHT_ARROW", "SUN", "TRAPEZOID", "TRIANGLE", "UP_ARROW", "UP_ARROW_CALLOUT", "UP_DOWN_ARROW", "UTURN_ARROW", "VERTICAL_SCROLL", "WAVE", "WEDGE_ELLIPSE_CALLOUT", "WEDGE_RECTANGLE_CALLOUT", "WEDGE_ROUND_RECTANGLE_CALLOUT", "WITH_OUT_SHAPE_TYPE"] },
            "elementProperties": { "type": "object" }
          },
          "required": ["shapeType"]
        }
      }
    },
    "CreateTableRequest": {
      "type": "object",
      "properties": {
        "createTable": {
          "type": "object",
          "properties": {
            "objectId": { "type": "string" },
            "elementProperties": { "type": "object" },
            "rows": { "type": "integer" },
            "columns": { "type": "integer" }
          },
          "required": ["rows", "columns"]
        }
      }
    },
    "InsertTextRequest": {
      "type": "object",
      "properties": {
        "insertText": {
          "type": "object",
          "properties": {
            "objectId": { "type": "string" },
            "cellLocation": { "type": "object" },
            "text": { "type": "string" },
            "insertionIndex": { "type": "integer" }
          },
          "required": ["objectId", "text"]
        }
      }
    },
    "DeleteObjectRequest": {
      "type": "object",
      "properties": {
        "deleteObject": {
          "type": "object",
          "properties": {
            "objectId": { "type": "string" }
          },
          "required": ["objectId"]
        }
      }
    },
    "DeleteTextRequest": {
      "type": "object",
      "properties": {
        "deleteText": {
          "type": "object",
          "properties": {
            "objectId": { "type": "string" },
            "cellLocation": { "type": "object" },
            "textRange": { "type": "object" }
          },
          "required": ["objectId"]
        }
      }
    },
    "InsertTableRowsRequest": {
      "type": "object",
      "properties": {
        "insertTableRows": {
          "type": "object",
          "properties": {
            "tableObjectId": { "type": "string" },
            "cellLocation": { "type": "object" },
            "insertBelow": { "type": "boolean" },
            "number": { "type": "integer" }
          },
          "required": ["tableObjectId"]
        }
      }
    },
    "InsertTableColumnsRequest": {
      "type": "object",
      "properties": {
        "insertTableColumns": {
          "type": "object",
          "properties": {
            "tableObjectId": { "type": "string" },
            "cellLocation": { "type": "object" },
            "insertRight": { "type": "boolean" },
            "number": { "type": "integer" }
          },
          "required": ["tableObjectId"]
        }
      }
    },
    "DeleteTableRowRequest": {
      "type": "object",
      "properties": {
        "deleteTableRow": {
          "type": "object",
          "properties": {
            "tableObjectId": { "type": "string" },
            "cellLocation": { "type": "object" }
          },
          "required": ["tableObjectId"]
        }
      }
    },
    "DeleteTableColumnRequest": {
      "type": "object",
      "properties": {
        "deleteTableColumn": {
          "type": "object",
          "properties": {
            "tableObjectId": { "type": "string" },
            "cellLocation": { "type": "object" }
          },
          "required": ["tableObjectId"]
        }
      }
    },
    "ReplaceAllTextRequest": {
      "type": "object",
      "properties": {
        "replaceAllText": {
          "type": "object",
          "properties": {
            "replaceText": { "type": "string" },
            "pageObjectIds": { "type": "array", "items": { "type": "string" } },
            "containsText": { "type": "object" }
          },
          "required": ["replaceText", "containsText"]
        }
      }
    },
    "UpdatePageElementTransformRequest": {
      "type": "object",
      "properties": {
        "updatePageElementTransform": {
          "type": "object",
          "properties": {
            "objectId": { "type": "string" },
            "transform": { "type": "object" },
            "applyMode": { "type": "string", "enum": ["APPLY_MODE_UNSPECIFIED", "RELATIVE", "ABSOLUTE"] }
          },
          "required": ["objectId", "transform"]
        }
      }
    },
    "UpdateSlidesPositionRequest": {
      "type": "object",
      "properties": {
        "updateSlidesPosition": {
          "type": "object",
          "properties": {
            "slideObjectIds": { "type": "array", "items": { "type": "string" } },
            "insertionIndex": { "type": "integer" }
          },
          "required": ["slideObjectIds"]
        }
      }
    },
    "CreateImageRequest": {
      "type": "object",
      "properties": {
        "createImage": {
          "type": "object",
          "properties": {
            "objectId": { "type": "string" },
            "url": { "type": "string" },
            "elementProperties": { "type": "object" }
          }
        }
      }
    },
    "CreateVideoRequest": {
      "type": "object",
      "properties": {
        "createVideo": {
          "type": "object",
          "properties": {
            "objectId": { "type": "string" },
            "id": { "type": "string" },
            "source": { "type": "string", "enum": ["SOURCE_UNSPECIFIED", "YOUTUBE", "DRIVE"] },
            "elementProperties": { "type": "object" }
          },
          "required": ["id", "source"]
        }
      }
    },
    "CreateSheetsChartRequest": {
      "type": "object",
      "properties": {
        "createSheetsChart": {
          "type": "object",
          "properties": {
            "objectId": { "type": "string" },
            "spreadsheetId": { "type": "string" },
            "chartId": { "type": "integer" },
            "linkingMode": { "type": "string", "enum": ["NOT_LINKED_IMAGE", "LINKED"] },
            "elementProperties": { "type": "object" }
          },
          "required": ["spreadsheetId", "chartId"]
        }
      }
    },
    "CreateLineRequest": {
      "type": "object",
      "properties": {
        "createLine": {
          "type": "object",
          "properties": {
            "objectId": { "type": "string" },
            "elementProperties": { "type": "object" },
            "lineCategory": { "type": "string", "enum": ["STRAIGHT", "BENT", "CURVED"] }
          }
        }
      }
    },
    "RefreshSheetsChartRequest": {
      "type": "object",
      "properties": {
        "refreshSheetsChart": {
          "type": "object",
          "properties": {
            "objectId": { "type": "string" }
          },
          "required": ["objectId"]
        }
      }
    },
    "UpdateShapePropertiesRequest": {
      "type": "object",
      "properties": {
        "updateShapeProperties": {
          "type": "object",
          "properties": {
            "objectId": { "type": "string" },
            "shapeProperties": { "type": "object" },
            "fields": { "type": "string" }
          },
          "required": ["objectId", "shapeProperties", "fields"]
        }
      }
    },
    "UpdateImagePropertiesRequest": {
      "type": "object",
      "properties": {
        "updateImageProperties": {
          "type": "object",
          "properties": {
            "objectId": { "type": "string" },
            "imageProperties": { "type": "object" },
            "fields": { "type": "string" }
          },
          "required": ["objectId", "imageProperties", "fields"]
        }
      }
    },
    "UpdateVideoPropertiesRequest": {
      "type": "object",
      "properties": {
        "updateVideoProperties": {
          "type": "object",
          "properties": {
            "objectId": { "type": "string" },
            "videoProperties": { "type": "object" },
            "fields": { "type": "string" }
          },
          "required": ["objectId", "videoProperties", "fields"]
        }
      }
    },
    "UpdatePagePropertiesRequest": {
      "type": "object",
      "properties": {
        "updatePageProperties": {
          "type": "object",
          "properties": {
            "objectId": { "type": "string" },
            "pageProperties": { "type": "object" },
            "fields": { "type": "string" }
          },
          "required": ["objectId", "pageProperties", "fields"]
        }
      }
    },
    "UpdateTableCellPropertiesRequest": {
      "type": "object",
      "properties": {
        "updateTableCellProperties": {
          "type": "object",
          "properties": {
            "objectId": { "type": "string" },
            "tableRange": { "type": "object" },
            "tableCellProperties": { "type": "object" },
            "fields": { "type": "string" }
          },
          "required": ["objectId", "fields"]
        }
      }
    },
    "UpdateLinePropertiesRequest": {
      "type": "object",
      "properties": {
        "updateLineProperties": {
          "type": "object",
          "properties": {
            "objectId": { "type": "string" },
            "lineProperties": { "type": "object" },
            "fields": { "type": "string" }
          },
          "required": ["objectId", "fields"]
        }
      }
    },
    "CreateParagraphBulletsRequest": {
      "type": "object",
      "properties": {
        "createParagraphBullets": {
          "type": "object",
          "properties": {
            "objectId": { "type": "string" },
            "cellLocation": { "type": "object" },
            "textRange": { "type": "object" },
            "bulletPreset": { "type": "string" }
          },
          "required": ["objectId"]
        }
      }
    },
    "ReplaceAllShapesWithImageRequest": {
      "type": "object",
      "properties": {
        "replaceAllShapesWithImage": {
          "type": "object",
          "properties": {
            "imageUrl": { "type": "string" },
            "replaceMethod": { "type": "string", "enum": ["CENTER_INSIDE", "CENTER_CROP"] },
            "containsText": { "type": "object" },
            "pageObjectIds": { "type": "array", "items": { "type": "string" } }
          },
          "required": ["imageUrl"]
        }
      }
    },
    "DuplicateObjectRequest": {
      "type": "object",
      "properties": {
        "duplicateObject": {
          "type": "object",
          "properties": {
            "objectId": { "type": "string" },
            "objectIds": { "type": "object" }
          },
          "required": ["objectId"]
        }
      }
    },
    "UpdateTextStyleRequest": {
      "type": "object",
      "properties": {
        "updateTextStyle": {
          "type": "object",
          "properties": {
            "objectId": { "type": "string" },
            "cellLocation": { "type": "object" },
            "style": { "type": "object" },
            "textRange": { "type": "object" },
            "fields": { "type": "string" }
          },
          "required": ["objectId", "style", "fields"]
        }
      }
    },
    "ReplaceAllShapesWithSheetsChartRequest": {
      "type": "object",
      "properties": {
        "replaceAllShapesWithSheetsChart": {
          "type": "object",
          "properties": {
            "spreadsheetId": { "type": "string" },
            "chartId": { "type": "integer" },
            "linkingMode": { "type": "string", "enum": ["NOT_LINKED_IMAGE", "LINKED"] },
            "containsText": { "type": "object" },
            "pageObjectIds": { "type": "array", "items": { "type": "string" } }
          },
          "required": ["spreadsheetId", "chartId", "containsText"]
        }
      }
    },
    "DeleteParagraphBulletsRequest": {
      "type": "object",
      "properties": {
        "deleteParagraphBullets": {
          "type": "object",
          "properties": {
            "objectId": { "type": "string" },
            "cellLocation": { "type": "object" },
            "textRange": { "type": "object" }
          },
          "required": ["objectId"]
        }
      }
    },
    "UpdateParagraphStyleRequest": {
      "type": "object",
      "properties": {
        "updateParagraphStyle": {
          "type": "object",
          "properties": {
            "objectId": { "type": "string" },
            "cellLocation": { "type": "object" },
            "style": { "type": "object" },
            "textRange": { "type": "object" },
            "fields": { "type": "string" }
          },
          "required": ["objectId", "style", "fields"]
        }
      }
    },
    "UpdateTableBorderPropertiesRequest": {
      "type": "object",
      "properties": {
        "updateTableBorderProperties": {
          "type": "object",
          "properties": {
            "objectId": { "type": "string" },
            "tableRange": { "type": "object" },
            "borderPosition": { "type": "string" },
            "tableBorderProperties": { "type": "object" },
            "fields": { "type": "string" }
          },
          "required": ["objectId", "fields"]
        }
      }
    },
    "UpdateTableColumnPropertiesRequest": {
      "type": "object",
      "properties": {
        "updateTableColumnProperties": {
          "type": "object",
          "properties": {
            "objectId": { "type": "string" },
            "columnIndices": { "type": "array", "items": { "type": "integer" } },
            "tableColumnProperties": { "type": "object" },
            "fields": { "type": "string" }
          },
          "required": ["objectId", "fields"]
        }
      }
    },
    "UpdateTableRowPropertiesRequest": {
      "type": "object",
      "properties": {
        "updateTableRowProperties": {
          "type": "object",
          "properties": {
            "objectId": { "type": "string" },
            "rowIndices": { "type": "array", "items": { "type": "integer" } },
            "tableRowProperties": { "type": "object" },
            "fields": { "type": "string" }
          },
          "required": ["objectId", "fields"]
        }
      }
    },
    "MergeTableCellsRequest": {
      "type": "object",
      "properties": {
        "mergeTableCells": {
          "type": "object",
          "properties": {
            "objectId": { "type": "string" },
            "tableRange": { "type": "object" }
          },
          "required": ["objectId"]
        }
      }
    },
    "UnmergeTableCellsRequest": {
      "type": "object",
      "properties": {
        "unmergeTableCells": {
          "type": "object",
          "properties": {
            "objectId": { "type": "string" },
            "tableRange": { "type": "object" }
          },
          "required": ["objectId"]
        }
      }
    },
    "GroupObjectsRequest": {
      "type": "object",
      "properties": {
        "groupObjects": {
          "type": "object",
          "properties": {
            "groupObjectId": { "type": "string" },
            "childrenObjectIds": { "type": "array", "items": { "type": "string" } }
          },
          "required": ["childrenObjectIds"]
        }
      }
    },
    "UngroupObjectsRequest": {
      "type": "object",
      "properties": {
        "ungroupObjects": {
          "type": "object",
          "properties": {
            "objectIds": { "type": "array", "items": { "type": "string" } }
          },
          "required": ["objectIds"]
        }
      }
    },
    "UpdatePageElementAltTextRequest": {
      "type": "object",
      "properties": {
        "updatePageElementAltText": {
          "type": "object",
          "properties": {
            "objectId": { "type": "string" },
            "title": { "type": "string" },
            "description": { "type": "string" }
          },
          "required": ["objectId"]
        }
      }
    },
    "ReplaceImageRequest": {
      "type": "object",
      "properties": {
        "replaceImage": {
          "type": "object",
          "properties": {
            "imageObjectId": { "type": "string" },
            "url": { "type": "string" },
            "imageReplaceMethod": { "type": "string", "enum": ["IMAGE_REPLACE_METHOD_UNSPECIFIED", "CENTER_INSIDE", "CENTER_CROP"] }
          },
          "required": ["imageObjectId", "url"]
        }
      }
    },
    "UpdateSlidePropertiesRequest": {
      "type": "object",
      "properties": {
        "updateSlideProperties": {
          "type": "object",
          "properties": {
            "objectId": { "type": "string" },
            "slideProperties": { "type": "object" },
            "fields": { "type": "string" }
          },
          "required": ["objectId", "slideProperties", "fields"]
        }
      }
    },
    "UpdatePageElementsZOrderRequest": {
      "type": "object",
      "properties": {
        "updatePageElementsZOrder": {
          "type": "object",
          "properties": {
            "pageElementObjectIds": { "type": "array", "items": { "type": "string" } },
            "operation": { "type": "string", "enum": ["Z_ORDER_OPERATION_UNSPECIFIED", "BRING_TO_FRONT", "BRING_FORWARD", "SEND_BACKWARD", "SEND_TO_BACK"] }
          },
          "required": ["pageElementObjectIds"]
        }
      }
    },
    "UpdateLineCategoryRequest": {
      "type": "object",
      "properties": {
        "updateLineCategory": {
          "type": "object",
          "properties": {
            "objectId": { "type": "string" },
            "lineCategory": { "type": "string", "enum": ["STRAIGHT", "BENT", "CURVED"] }
          },
          "required": ["objectId", "lineCategory"]
        }
      }
    },
    "RerouteLineRequest": {
      "type": "object",
      "properties": {
        "rerouteLine": {
          "type": "object",
          "properties": {
            "objectId": { "type": "string" }
          },
          "required": ["objectId"]
        }
      }
    }
  }
};