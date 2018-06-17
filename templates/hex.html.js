
  var hexMap = JSON.stringify(_.invert({
    0: '0x80000000',
    1: '0x851EB851',
    2: '0x8A3D70A2',
    3: '0x8F5C28F3',
    4: '0x947AE144',
    5: '0x99999995',
    6: '0x9EB851E6',
    7: '0xA3D70A37',
    8: '0xA8F5C288',
    9: '0xAE147AD9',
    10: '0xB333332A',
    11: '0xB851EB7B',
    12: '0xBD70A3CC',
    13: '0xC28F5C1D',
    14: '0xC7AE146E',
    15: '0xCCCCCCBF',
    16: '0xD1EB8510',
    17: '0xD70A3D61',
    18: '0xDC28F5B2',
    19: '0xE147AE03',
    20: '0xE6666654',
    21: '0xEB851EA5',
    22: '0xF0A3D6F6',
    23: '0xF5C28F47',
    24: '0xFAE14798',
    25: '0x00000000',
    26: '0x051EB83A',
    27: '0x0A3D708B',
    28: '0x0F5C28DC',
    29: '0x147AE12D',
    30: '0x1999997E',
    31: '0x1EB851CF',
    32: '0x23D70A20',
    33: '0x28F5C271',
    34: '0x2E147AC2',
    35: '0x33333313',
    36: '0x3851EB64',
    37: '0x3D70A3B5',
    38: '0x428F5C06',
    39: '0x47AE1457',
    40: '0x4CCCCCA8',
    41: '0x51EB84F9',
    42: '0x570A3D4A',
    43: '0x5C28F59B',
    44: '0x6147ADEC',
    45: '0x6666663D',
    46: '0x6B851E8E',
    47: '0x70A3D6DF',
    48: '0x75C28F30',
    49: '0x7AE14781',
    50: '0x7FFFFFD2'
  }));



var HEX_TEMPLATE = (`
<div class="form-group {{form.htmlClass}} schema-form-select" ng-class=
    "{'has-error': form.disableErrorState !== true && hasError(), 'has-success': form.disableSuccessState !== true && hasSuccess(), 'has-feedback': form.feedback !== false}">
    <label class="control-label {{form.labelHtmlClass}}" ng-show="showTitle()">{{form.title}}</label>
    <select ng-model="$$value$$" ng-model-options="form.ngModelOptions" style="width: 120px;" ng-disabled=
        "form.readonly" sf-changed="form" class="form-control {{form.fieldHtmlClass}}" schema-validate="form" ng-options=
        "item.value as item.name group by item.group for item in form.titleMap" name="{{form.key.slice(-1)[0]}}">
        </select>
    <div class="hex">{{$$value$$ | hex50 }}</div>

    <div class="help-block" sf-message="form.description"></div>
</div>
`)