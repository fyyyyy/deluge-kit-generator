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

var DEFAULT_TEMPLATE = (`
<div class="form-group schema-form-{{form.type}} {{form.htmlClass}}" ng-class="{'has-error': form.disableErrorState !== true && hasError(), 'has-success': form.disableSuccessState !== true && hasSuccess(), 'has-feedback': form.feedback !== false }">
    
    <h3 ng-if="form.title === 'name'" class="control-label {{form.labelHtmlClass}}" ng-class="{'sr-only': !showTitle()}" for="{{form.key.slice(-1)[0]}}">{{ $$value$$ }}</h3>
    <label ng-if="form.title !== 'name'" class="control-label {{form.labelHtmlClass}}" ng-class="{'sr-only': !showTitle()}" for="{{form.key.slice(-1)[0]}}">{{ form.title }}</label>
    
    <span ng-if="form.required == true" class="glyphicon glyphicon-asterisk text-danger"></span>

    <input ng-if="form.type !== 'number' && !form.fieldAddonLeft && !form.fieldAddonRight" ng-show="form.key" type="{{form.type}}" step="any"
        sf-changed="form" placeholder="{{form.placeholder}}" class="form-control {{form.fieldHtmlClass}}" id="{{form.key.slice(-1)[0]}}"
        ng-model-options="form.ngModelOptions" ng-model="$$value$$" ng-disabled="form.readonly" schema-validate="form" name="{{form.key.slice(-1)[0]}}"
        aria-describedby="{{form.key.slice(-1)[0] + 'Status'}}">

        {{fixm50to50($$value$$)}}
    
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