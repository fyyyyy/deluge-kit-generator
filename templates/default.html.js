var options = JSON.stringify({
  size: 60,
  displayPrevious: true,
  trackWidth: 20,
  barWidth: 10,
  trackColor: 'rgba(101,109,127, 1)',
  prevBarColor: 'rgba(255,255, 255,.5)',
  barColor: 'rgba(44,193,133, 0.7)',
  step: 1,
  startAngle: -180,
  endAngle: 180,
}).replace(/"/g, "'");



var hexMap = JSON.stringify({
    '0': "0xFFFFFFFD",
    '1': "0xA3FF5C",
    '2': "0x1EBFE14",
    '3': "0x333FCCC",
    '4': "0x47AFB85",
    '5': "0x5C2FA3D",
    '6': "0x70AF8F5",
    '7': "0x851F7AE",
    '8': "0x999F666",
    '9': "0xAE1F51E",
    '10': "0xC29F3D6",
    '11': "0xD70F28F",
    '12': "0xEB8F147",
    '13': "0x1000EFFF",
    '14': "0x1147EEB8",
    '15': "0x128FED70",
    '16': "0x13D7EC28",
    '17': "0x151EEAE1",
    '18': "0x1666E999",
    '19': "0x17AEE851",
    '20': "0x18F5E70A",
    '21': "0x1A3DE5C2",
    '22': "0x1B85E47A",
    '23': "0x1CCCE333",
    '24': "0x1E14E1EB",
    '25': "0x1F5CE0A3",
    '26': "0x20A3DF5C",
    '27': "0x21EBDE14",
    '28': "0x2333DCCC",
    '29': "0x247BDB84",
    '30': "0x25C2DA3D",
    '31': "0x270AD8F5",
    '32': "0x2852D7AD",
    '33': "0x2999D666",
    '34': "0x2AE1D51E",
    '35': "0x2C29D3D6",
    '36': "0x2D70D28F",
    '37': "0x2EB8D147",
    '38': "0x3000CFFF",
    '39': "0x3147CEB8",
    '40': "0x328FCD70",
    '41': "0x33D7CC28",
    '42': "0x351ECAE1",
    '43': "0x3666C999",
    '44': "0x37AEC851",
    '45': "0x38F5C70A",
    '46': "0x3A3DC5C2",
    '47': "0x3B85C47A",
    '48': "0x3CCDC332",
    '49': "0x3E14C1EB",
    '50': "0x3F5CC0A3",
    '-1': "0xFE1501EA",
    '-2': "0xFCCD0332",
    '-3': "0xFB860479",
    '-4': "0xFA3E05C1",
    '-5': "0xF8F60709",
    '-6': "0xF7AF0850",
    '-7': "0xF6670998",
    '-8': "0xF51F0AE0",
    '-9': "0xF3D70C28",
    '-10': "0xF2900D6F",
    '-11': "0xF1480EB7",
    '-12': "0xF0000FFF",
    '-13': "0xEEB91146",
    '-14': "0xED71128E",
    '-15': "0xEC2913D6",
    '-16': "0xEAE2151D",
    '-17': "0xE99A1665",
    '-18': "0xE85217AD",
    '-19': "0xE70B18F4",
    '-20': "0xE5C31A3C",
    '-21': "0xE47B1B84",
    '-22': "0xE3341CCB",
    '-23': "0xE1EC1E13",
    '-24': "0xE0A41F5B",
    '-25': "0xDF5D20A2",
    '-26': "0xDE1521EA",
    '-27': "0xDCCD2332",
    '-28': "0xDB85247A",
    '-29': "0xDA3E25C1",
    '-30': "0xD8F62709",
    '-31': "0xD7AE2851",
    '-32': "0xD6672998",
    '-33': "0xD51F2AE0",
    '-34': "0xD3D72C28",
    '-35': "0xD2902D6F",
    '-36': "0xD1482EB7",
    '-37': "0xD0002FFF",
    '-38': "0xCEB93146",
    '-39': "0xCD71328E",
    '-40': "0xCC2933D6",
    '-41': "0xCAE2351D",
    '-42': "0xC99A3665",
    '-43': "0xC85237AD",
    '-44': "0xC70B38F4",
    '-45': "0xC5C33A3C",
    '-46': "0xC47B3B84",
    '-47': "0xC3333CCC",
    '-48': "0xC1EC3E13",
    '-49': "0xC0A43F5B",
    '-50': "0xBF5C40A3"
}).replace(/"/g, "'");

var DEFAULT_TEMPLATE = (`
<div class="form-group schema-form-{{form.type}} {{form.htmlClass}}" ng-class="{'has-error': form.disableErrorState !== true && hasError(), 'has-success': form.disableSuccessState !== true && hasSuccess(), 'has-feedback': form.feedback !== false }">

    <h3 ng-if="form.title === 'name'" class="control-label {{form.labelHtmlClass}}" ng-class="{'sr-only': !showTitle()}" for="{{form.key.slice(-1)[0]}}">{{ $$value$$ }}</h3>
    <label ng-if="form.title !== 'name'" class="control-label {{form.labelHtmlClass}}" ng-class="{'sr-only': !showTitle()}" for="{{form.key.slice(-1)[0]}}">{{ form.title }}</label>
    
    <span ng-if="form.required == true" class="glyphicon glyphicon-asterisk text-danger"></span>

    <input style="width: 180px;" ng-if="form.type !== 'number' && !form.fieldAddonLeft && !form.fieldAddonRight" ng-show="form.key" type="{{form.type}}" step="any"
        sf-changed="form" placeholder="{{form.placeholder}}" class="form-control {{form.fieldHtmlClass}}" id="{{form.key.slice(-1)[0]}}"
        ng-model-options="form.ngModelOptions" ng-model="$$value$$" ng-disabled="form.readonly" name="{{form.key.slice(-1)[0]}}"
        aria-describedby="{{form.key.slice(-1)[0] + 'Status'}}">

    <span ng-if="form.type === 'hex'" class="hex"><i>{{$$value$$ | hex }}</i></span>
    <select ng-if="form.type === 'hex'" ng-model="$$value$$" ng-model-options="form.ngModelOptions" style="width: 120px;" class="form-control {{form.fieldHtmlClass}}"
        ng-options="k as v for (v, k) in ${hexMap}" name="{{form.key.slice(-1)[0]}}">
    </select>

    <ui-knob title="{{form.description}}" ng-if="form.type === 'number' && !form.fieldAddonLeft && !form.fieldAddonRight" value="$$value$$" min="{{form.minimum}}" max="{{form.maximum}}" step="{{form.step}}" options="${options}"></ui-knob>
    
    <div ng-if="form.fieldAddonLeft || form.fieldAddonRight" ng-class="{'input-group': (form.fieldAddonLeft || form.fieldAddonRight)}">
        <span ng-if="form.fieldAddonLeft" class="input-group-addon" ng-bind-html="form.fieldAddonLeft"></span>
        <input ng-show="form.key" type="{{form.type}}" step="any" sf-changed="form" placeholder="{{form.placeholder}}"
            class="form-control {{form.fieldHtmlClass}}" id="{{form.key.slice(-1)[0]}}" ng-model-options="form.ngModelOptions"
            ng-model="$$value$$" ng-disabled="form.readonly" schema-validate="form" name="{{form.key.slice(-1)[0]}}" aria-describedby="{{form.key.slice(-1)[0] + 'Status'}}">
        <span ng-if="form.fieldAddonRight" class="input-group-addon" ng-bind-html="form.fieldAddonRight"></span>
    </div>
    <span ng-if="form.feedback !== false" class="form-control-feedback" ng-class="evalInScope(form.feedback) || {'glyphicon': true, 'glyphicon-ok': hasSuccess(), 'glyphicon-remove': hasError() }"
        aria-hidden="true"></span>
    <span ng-if="hasError() || hasSuccess()" id="{{form.key.slice(-1)[0] + 'Status'}}" class="sr-only">{{ hasSuccess() ? '(success)' : '(error)' }}</span>
    <div class="help-block" sf-message="form.description"></div>
</div>`);