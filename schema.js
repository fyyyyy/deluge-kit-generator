var SCHEMA = {
  "type": "object",
  "required": [],
  "properties": {
    "firmwareVersion": {
      "type": "string"
    },
    "kit": {
      "type": "object",
      "required": [],
      "properties": {
        "soundSources": {
          "type": "object",
          "required": [],
          "properties": {
            "sound": {
              "type": "array",
              "items": {
                "type": "object",
                "required": [],
                "properties": {
                  "name": {
                    "type": "string"
                  },
                  "osc1": {
                    "type": "object",
                    "required": [],
                    "properties": {
                      "fileName": {
                        "type": "string"
                      },
                      "transpose": {
                        "type": "string"
                      },
                      "cents": {
                        "type": "string"
                      },
                      "zone": {
                        "type": "object",
                        "required": [],
                        "properties": {
                          "startMilliseconds": {
                            "type": "string"
                          },
                          "endMilliseconds": {
                            "type": "string"
                          }
                        }
                      }
                    }
                  },
                  "osc2": {
                    "type": "object",
                    "required": [],
                    "properties": {
                      "fileName": {
                        "type": "string"
                      },
                      "transpose": {
                        "type": "string"
                      },
                      "cents": {
                        "type": "string"
                      },
                      "zone": {
                        "type": "object",
                        "required": [],
                        "properties": {
                          "startMilliseconds": {
                            "type": "string"
                          },
                          "endMilliseconds": {
                            "type": "string"
                          }
                        }
                      }
                    }
                  },
                  "defaultParams": {
                    "type": "object",
                    "required": [],
                    "properties": {
                      "oscAVolume": {
                        "type": "string",
                        "title": "Osc 1 Volume",
                        "enum": ["0x80000000", "0x851EB851", "0x8A3D70A2", "0x8F5C28F3", "0x947AE144", "0x99999995", "0x9EB851E6", "0xA3D70A37", "0xA8F5C288", "0xAE147AD9", "0xB333332A", "0xB851EB7B", "0xBD70A3CC", "0xC28F5C1D", "0xC7AE146E", "0xCCCCCCBF", "0xD1EB8510", "0xD70A3D61", "0xDC28F5B2", "0xE147AE03", "0xE6666654", "0xEB851EA5", "0xF0A3D6F6", "0xF5C28F47", "0xFAE14798", "0x00000000", "0x051EB83A", "0x0A3D708B", "0x0F5C28DC", "0x147AE12D", "0x1999997E", "0x1EB851CF", "0x23D70A20", "0x28F5C271", "0x2E147AC2", "0x33333313", "0x3851EB64", "0x3D70A3B5", "0x428F5C06", "0x47AE1457", "0x4CCCCCA8", "0x51EB84F9", "0x570A3D4A", "0x5C28F59B", "0x6147ADEC", "0x6666663D", "0x6B851E8E", "0x70A3D6DF", "0x75C28F30", "0x7AE14781", "0x7FFFFFD2"]
                      },
                      "oscBVolume": {
                        "type": "string",
                        "title": "Osc 2 Volume",
                        "enum": ["0x80000000", "0x851EB851", "0x8A3D70A2", "0x8F5C28F3", "0x947AE144", "0x99999995", "0x9EB851E6", "0xA3D70A37", "0xA8F5C288", "0xAE147AD9", "0xB333332A", "0xB851EB7B", "0xBD70A3CC", "0xC28F5C1D", "0xC7AE146E", "0xCCCCCCBF", "0xD1EB8510", "0xD70A3D61", "0xDC28F5B2", "0xE147AE03", "0xE6666654", "0xEB851EA5", "0xF0A3D6F6", "0xF5C28F47", "0xFAE14798", "0x00000000", "0x051EB83A", "0x0A3D708B", "0x0F5C28DC", "0x147AE12D", "0x1999997E", "0x1EB851CF", "0x23D70A20", "0x28F5C271", "0x2E147AC2", "0x33333313", "0x3851EB64", "0x3D70A3B5", "0x428F5C06", "0x47AE1457", "0x4CCCCCA8", "0x51EB84F9", "0x570A3D4A", "0x5C28F59B", "0x6147ADEC", "0x6666663D", "0x6B851E8E", "0x70A3D6DF", "0x75C28F30", "0x7AE14781", "0x7FFFFFD2"]
                      },
                      "lpfFrequency": {
                        "type": "string",
                        "enum": ["0x80000000", "0x851EB851", "0x8A3D70A2", "0x8F5C28F3", "0x947AE144", "0x99999995", "0x9EB851E6", "0xA3D70A37", "0xA8F5C288", "0xAE147AD9", "0xB333332A", "0xB851EB7B", "0xBD70A3CC", "0xC28F5C1D", "0xC7AE146E", "0xCCCCCCBF", "0xD1EB8510", "0xD70A3D61", "0xDC28F5B2", "0xE147AE03", "0xE6666654", "0xEB851EA5", "0xF0A3D6F6", "0xF5C28F47", "0xFAE14798", "0x00000000", "0x051EB83A", "0x0A3D708B", "0x0F5C28DC", "0x147AE12D", "0x1999997E", "0x1EB851CF", "0x23D70A20", "0x28F5C271", "0x2E147AC2", "0x33333313", "0x3851EB64", "0x3D70A3B5", "0x428F5C06", "0x47AE1457", "0x4CCCCCA8", "0x51EB84F9", "0x570A3D4A", "0x5C28F59B", "0x6147ADEC", "0x6666663D", "0x6B851E8E", "0x70A3D6DF", "0x75C28F30", "0x7AE14781", "0x7FFFFFD2"]
                      },
                      "lpfResonance": {
                        "type": "string",
                        "enum": ["0x80000000", "0x851EB851", "0x8A3D70A2", "0x8F5C28F3", "0x947AE144", "0x99999995", "0x9EB851E6", "0xA3D70A37", "0xA8F5C288", "0xAE147AD9", "0xB333332A", "0xB851EB7B", "0xBD70A3CC", "0xC28F5C1D", "0xC7AE146E", "0xCCCCCCBF", "0xD1EB8510", "0xD70A3D61", "0xDC28F5B2", "0xE147AE03", "0xE6666654", "0xEB851EA5", "0xF0A3D6F6", "0xF5C28F47", "0xFAE14798", "0x00000000", "0x051EB83A", "0x0A3D708B", "0x0F5C28DC", "0x147AE12D", "0x1999997E", "0x1EB851CF", "0x23D70A20", "0x28F5C271", "0x2E147AC2", "0x33333313", "0x3851EB64", "0x3D70A3B5", "0x428F5C06", "0x47AE1457", "0x4CCCCCA8", "0x51EB84F9", "0x570A3D4A", "0x5C28F59B", "0x6147ADEC", "0x6666663D", "0x6B851E8E", "0x70A3D6DF", "0x75C28F30", "0x7AE14781", "0x7FFFFFD2"]
                      },
                      "envelope1": {
                        "type": "object",
                        "required": [],
                        "properties": {
                          "attack": {
                            "type": "string",
                            "enum": ["0x80000000", "0x851EB851", "0x8A3D70A2", "0x8F5C28F3", "0x947AE144", "0x99999995", "0x9EB851E6", "0xA3D70A37", "0xA8F5C288", "0xAE147AD9", "0xB333332A", "0xB851EB7B", "0xBD70A3CC", "0xC28F5C1D", "0xC7AE146E", "0xCCCCCCBF", "0xD1EB8510", "0xD70A3D61", "0xDC28F5B2", "0xE147AE03", "0xE6666654", "0xEB851EA5", "0xF0A3D6F6", "0xF5C28F47", "0xFAE14798", "0x00000000", "0x051EB83A", "0x0A3D708B", "0x0F5C28DC", "0x147AE12D", "0x1999997E", "0x1EB851CF", "0x23D70A20", "0x28F5C271", "0x2E147AC2", "0x33333313", "0x3851EB64", "0x3D70A3B5", "0x428F5C06", "0x47AE1457", "0x4CCCCCA8", "0x51EB84F9", "0x570A3D4A", "0x5C28F59B", "0x6147ADEC", "0x6666663D", "0x6B851E8E", "0x70A3D6DF", "0x75C28F30", "0x7AE14781", "0x7FFFFFD2"]
                          },
                          "decay": {
                            "type": "string",
                            "enum": ["0x80000000", "0x851EB851", "0x8A3D70A2", "0x8F5C28F3", "0x947AE144", "0x99999995", "0x9EB851E6", "0xA3D70A37", "0xA8F5C288", "0xAE147AD9", "0xB333332A", "0xB851EB7B", "0xBD70A3CC", "0xC28F5C1D", "0xC7AE146E", "0xCCCCCCBF", "0xD1EB8510", "0xD70A3D61", "0xDC28F5B2", "0xE147AE03", "0xE6666654", "0xEB851EA5", "0xF0A3D6F6", "0xF5C28F47", "0xFAE14798", "0x00000000", "0x051EB83A", "0x0A3D708B", "0x0F5C28DC", "0x147AE12D", "0x1999997E", "0x1EB851CF", "0x23D70A20", "0x28F5C271", "0x2E147AC2", "0x33333313", "0x3851EB64", "0x3D70A3B5", "0x428F5C06", "0x47AE1457", "0x4CCCCCA8", "0x51EB84F9", "0x570A3D4A", "0x5C28F59B", "0x6147ADEC", "0x6666663D", "0x6B851E8E", "0x70A3D6DF", "0x75C28F30", "0x7AE14781", "0x7FFFFFD2"]
                          },
                          "sustain": {
                            "type": "string",
                            "enum": ["0x80000000", "0x851EB851", "0x8A3D70A2", "0x8F5C28F3", "0x947AE144", "0x99999995", "0x9EB851E6", "0xA3D70A37", "0xA8F5C288", "0xAE147AD9", "0xB333332A", "0xB851EB7B", "0xBD70A3CC", "0xC28F5C1D", "0xC7AE146E", "0xCCCCCCBF", "0xD1EB8510", "0xD70A3D61", "0xDC28F5B2", "0xE147AE03", "0xE6666654", "0xEB851EA5", "0xF0A3D6F6", "0xF5C28F47", "0xFAE14798", "0x00000000", "0x051EB83A", "0x0A3D708B", "0x0F5C28DC", "0x147AE12D", "0x1999997E", "0x1EB851CF", "0x23D70A20", "0x28F5C271", "0x2E147AC2", "0x33333313", "0x3851EB64", "0x3D70A3B5", "0x428F5C06", "0x47AE1457", "0x4CCCCCA8", "0x51EB84F9", "0x570A3D4A", "0x5C28F59B", "0x6147ADEC", "0x6666663D", "0x6B851E8E", "0x70A3D6DF", "0x75C28F30", "0x7AE14781", "0x7FFFFFD2"]
                          },
                          "release": {
                            "type": "string",
                            "enum": ["0x80000000", "0x851EB851", "0x8A3D70A2", "0x8F5C28F3", "0x947AE144", "0x99999995", "0x9EB851E6", "0xA3D70A37", "0xA8F5C288", "0xAE147AD9", "0xB333332A", "0xB851EB7B", "0xBD70A3CC", "0xC28F5C1D", "0xC7AE146E", "0xCCCCCCBF", "0xD1EB8510", "0xD70A3D61", "0xDC28F5B2", "0xE147AE03", "0xE6666654", "0xEB851EA5", "0xF0A3D6F6", "0xF5C28F47", "0xFAE14798", "0x00000000", "0x051EB83A", "0x0A3D708B", "0x0F5C28DC", "0x147AE12D", "0x1999997E", "0x1EB851CF", "0x23D70A20", "0x28F5C271", "0x2E147AC2", "0x33333313", "0x3851EB64", "0x3D70A3B5", "0x428F5C06", "0x47AE1457", "0x4CCCCCA8", "0x51EB84F9", "0x570A3D4A", "0x5C28F59B", "0x6147ADEC", "0x6666663D", "0x6B851E8E", "0x70A3D6DF", "0x75C28F30", "0x7AE14781", "0x7FFFFFD2"]
                          }
                        }
                      },
                      "envelope2": {
                        "type": "object",
                        "required": [],
                        "properties": {
                          "attack": {
                            "type": "string",
                            "enum": ["0x80000000", "0x851EB851", "0x8A3D70A2", "0x8F5C28F3", "0x947AE144", "0x99999995", "0x9EB851E6", "0xA3D70A37", "0xA8F5C288", "0xAE147AD9", "0xB333332A", "0xB851EB7B", "0xBD70A3CC", "0xC28F5C1D", "0xC7AE146E", "0xCCCCCCBF", "0xD1EB8510", "0xD70A3D61", "0xDC28F5B2", "0xE147AE03", "0xE6666654", "0xEB851EA5", "0xF0A3D6F6", "0xF5C28F47", "0xFAE14798", "0x00000000", "0x051EB83A", "0x0A3D708B", "0x0F5C28DC", "0x147AE12D", "0x1999997E", "0x1EB851CF", "0x23D70A20", "0x28F5C271", "0x2E147AC2", "0x33333313", "0x3851EB64", "0x3D70A3B5", "0x428F5C06", "0x47AE1457", "0x4CCCCCA8", "0x51EB84F9", "0x570A3D4A", "0x5C28F59B", "0x6147ADEC", "0x6666663D", "0x6B851E8E", "0x70A3D6DF", "0x75C28F30", "0x7AE14781", "0x7FFFFFD2"]
                          },
                          "decay": {
                            "type": "string",
                            "enum": ["0x80000000", "0x851EB851", "0x8A3D70A2", "0x8F5C28F3", "0x947AE144", "0x99999995", "0x9EB851E6", "0xA3D70A37", "0xA8F5C288", "0xAE147AD9", "0xB333332A", "0xB851EB7B", "0xBD70A3CC", "0xC28F5C1D", "0xC7AE146E", "0xCCCCCCBF", "0xD1EB8510", "0xD70A3D61", "0xDC28F5B2", "0xE147AE03", "0xE6666654", "0xEB851EA5", "0xF0A3D6F6", "0xF5C28F47", "0xFAE14798", "0x00000000", "0x051EB83A", "0x0A3D708B", "0x0F5C28DC", "0x147AE12D", "0x1999997E", "0x1EB851CF", "0x23D70A20", "0x28F5C271", "0x2E147AC2", "0x33333313", "0x3851EB64", "0x3D70A3B5", "0x428F5C06", "0x47AE1457", "0x4CCCCCA8", "0x51EB84F9", "0x570A3D4A", "0x5C28F59B", "0x6147ADEC", "0x6666663D", "0x6B851E8E", "0x70A3D6DF", "0x75C28F30", "0x7AE14781", "0x7FFFFFD2"]
                          },
                          "sustain": {
                            "type": "string",
                            "enum": ["0x80000000", "0x851EB851", "0x8A3D70A2", "0x8F5C28F3", "0x947AE144", "0x99999995", "0x9EB851E6", "0xA3D70A37", "0xA8F5C288", "0xAE147AD9", "0xB333332A", "0xB851EB7B", "0xBD70A3CC", "0xC28F5C1D", "0xC7AE146E", "0xCCCCCCBF", "0xD1EB8510", "0xD70A3D61", "0xDC28F5B2", "0xE147AE03", "0xE6666654", "0xEB851EA5", "0xF0A3D6F6", "0xF5C28F47", "0xFAE14798", "0x00000000", "0x051EB83A", "0x0A3D708B", "0x0F5C28DC", "0x147AE12D", "0x1999997E", "0x1EB851CF", "0x23D70A20", "0x28F5C271", "0x2E147AC2", "0x33333313", "0x3851EB64", "0x3D70A3B5", "0x428F5C06", "0x47AE1457", "0x4CCCCCA8", "0x51EB84F9", "0x570A3D4A", "0x5C28F59B", "0x6147ADEC", "0x6666663D", "0x6B851E8E", "0x70A3D6DF", "0x75C28F30", "0x7AE14781", "0x7FFFFFD2"]
                          },
                          "release": {
                            "type": "string",
                            "enum": ["0x80000000", "0x851EB851", "0x8A3D70A2", "0x8F5C28F3", "0x947AE144", "0x99999995", "0x9EB851E6", "0xA3D70A37", "0xA8F5C288", "0xAE147AD9", "0xB333332A", "0xB851EB7B", "0xBD70A3CC", "0xC28F5C1D", "0xC7AE146E", "0xCCCCCCBF", "0xD1EB8510", "0xD70A3D61", "0xDC28F5B2", "0xE147AE03", "0xE6666654", "0xEB851EA5", "0xF0A3D6F6", "0xF5C28F47", "0xFAE14798", "0x00000000", "0x051EB83A", "0x0A3D708B", "0x0F5C28DC", "0x147AE12D", "0x1999997E", "0x1EB851CF", "0x23D70A20", "0x28F5C271", "0x2E147AC2", "0x33333313", "0x3851EB64", "0x3D70A3B5", "0x428F5C06", "0x47AE1457", "0x4CCCCCA8", "0x51EB84F9", "0x570A3D4A", "0x5C28F59B", "0x6147ADEC", "0x6666663D", "0x6B851E8E", "0x70A3D6DF", "0x75C28F30", "0x7AE14781", "0x7FFFFFD2"]
                          }
                        }
                      },
                      "lfo1Rate": {
                        "type": "string",
                        "enum": ["0x80000000", "0x851EB851", "0x8A3D70A2", "0x8F5C28F3", "0x947AE144", "0x99999995", "0x9EB851E6", "0xA3D70A37", "0xA8F5C288", "0xAE147AD9", "0xB333332A", "0xB851EB7B", "0xBD70A3CC", "0xC28F5C1D", "0xC7AE146E", "0xCCCCCCBF", "0xD1EB8510", "0xD70A3D61", "0xDC28F5B2", "0xE147AE03", "0xE6666654", "0xEB851EA5", "0xF0A3D6F6", "0xF5C28F47", "0xFAE14798", "0x00000000", "0x051EB83A", "0x0A3D708B", "0x0F5C28DC", "0x147AE12D", "0x1999997E", "0x1EB851CF", "0x23D70A20", "0x28F5C271", "0x2E147AC2", "0x33333313", "0x3851EB64", "0x3D70A3B5", "0x428F5C06", "0x47AE1457", "0x4CCCCCA8", "0x51EB84F9", "0x570A3D4A", "0x5C28F59B", "0x6147ADEC", "0x6666663D", "0x6B851E8E", "0x70A3D6DF", "0x75C28F30", "0x7AE14781", "0x7FFFFFD2"]
                      },
                      "lfo2Rate": {
                        "type": "string",
                        "enum": ["0x80000000", "0x851EB851", "0x8A3D70A2", "0x8F5C28F3", "0x947AE144", "0x99999995", "0x9EB851E6", "0xA3D70A37", "0xA8F5C288", "0xAE147AD9", "0xB333332A", "0xB851EB7B", "0xBD70A3CC", "0xC28F5C1D", "0xC7AE146E", "0xCCCCCCBF", "0xD1EB8510", "0xD70A3D61", "0xDC28F5B2", "0xE147AE03", "0xE6666654", "0xEB851EA5", "0xF0A3D6F6", "0xF5C28F47", "0xFAE14798", "0x00000000", "0x051EB83A", "0x0A3D708B", "0x0F5C28DC", "0x147AE12D", "0x1999997E", "0x1EB851CF", "0x23D70A20", "0x28F5C271", "0x2E147AC2", "0x33333313", "0x3851EB64", "0x3D70A3B5", "0x428F5C06", "0x47AE1457", "0x4CCCCCA8", "0x51EB84F9", "0x570A3D4A", "0x5C28F59B", "0x6147ADEC", "0x6666663D", "0x6B851E8E", "0x70A3D6DF", "0x75C28F30", "0x7AE14781", "0x7FFFFFD2"]
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "selectedDrumIndex": {
          "type": "string"
        }
      }
    }
  }
}