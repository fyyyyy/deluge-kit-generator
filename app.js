var app = angular.module('plunker', ['ngSanitize', 'schemaForm', 'ui.knob']);

app.filter('highlight', function ($sce) {
  return function (text, phrase) {
    if (phrase) text = text.replace(new RegExp(phrase, 'g'), '<span class="highlighted">$1</span>');
    return $sce.trustAsHtml(text)
  }
})

app.controller('MainCtrl', function($scope) {

  mapValuesDeep = function mapValuesDeep(v, callback) {
    return _.isObject(v) ?
      _.mapValues(v, function(x) {
        return mapValuesDeep(x, callback);
      }) :
      callback(v);
  }

  var x2js = new X2JS();

  $scope.search = /((A|B|C|D|E|F|G)(#|b)?(\d))/;

  $scope.schema = SCHEMA;
  $scope.schema_osc = SCHEMA_OSC;

  $scope.model = {};
  $scope.osc = {};

  $scope.form = [
    '*'
  ];

  function fixm50to50(v) {
    if (v === undefined) return 0;
    if (typeof v !== "string") return v;
    let res = v;
    if (v.startsWith('0x')) {
      let asInt = parseInt(v.substring(2, 10), 16);
      // Convert to signed 32 bit.
      if (asInt & 0x80000000) {
        asInt -= 0x100000000;
      }
      // mod matrix weights range from 0xC0000000 to 0x3FFFFFF, and we want to show it
      // as -50 to 50
      res = Math.round(((asInt + 0x80000000) * 200) / 0x100000000) - 100;
    }
    if (v.length > 10) {
      res += '…';
    }
    return res;
  }

  $scope.fixm50to50 = fixm50to50;


  var hexMap = {
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
  }


  $scope.toHex = function (val) {
    return _.invert({
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
    })[val];
  }


  
  function convertHexTo50(str) {
    let v = parseInt(str, 16);
    if (v & 0x80000000) {
      v -= 0x100000000;
    }
    let vr = Math.round(((v + 0x80000000) * 50) / 0x100000000);
    return vr;
  }


  function calcNoteValue(files) {
    var signMap = { '#': 1, 'b': -1 };
    var noteMap = { 'C': 0, 'D': 2, 'E': 4, 'F': 5, 'G': 7, 'A': 9, 'B': 11 };

    return _.map(files, function(file) {
      // regex matches
      var matches = file.name.match($scope.search);

      if (!matches) {
        console.error('could not identify note in name', matches, file);
        return;
      };
      
      // Note
      var value = noteMap[matches[2]];
      
      // Octave
      value += (Number(matches[4] * 12));
      
      // Sharp or Flat ? # or b ?
      var sign = matches[3];
      if (sign) value += signMap[sign];
      
      // Set note value
      file.value = value;

      // This is not a placeholder
      file.placeholder = false;
      
      return file;
    });
  }

  function fillMissingSamples(files, range) {

    // range is the reference for min max note values to fill up
    var min = _.min(range || _.map(files, 'value'));
    console.log('​fillMissingSamples -> min', min);
    var max = _.max(range || _.map(files, 'value'));
    console.log('​fillMissingSamples -> max', max);
    

    _.times(max - min + 1, function (n) {
      var value = min + n;
      var noteMap = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
      var exists = _.find(files, { value: value });

      if (!exists) {
        var octave = _.floor(value / 12);
        var noteName = noteMap[value % 12] + octave;
        var nearest = findNearestSample(files, value);

        if (!nearest) {
          console.warn('no Nearest sample found for ', noteName)  ;
          return;
        }
        
        // add placeholder
        files.push({
          name: '<b>MISSING FILE</b> --' + noteName + '--> Transposing <em>' + nearest.name + '</em> by <b>' + (nearest.transpose > 0 ? '+' : '') + nearest.transpose + '</b>',
            value: value,
            placeholder: true,
            nearest: nearest
        });
      }
    });


    function findNearestSample(files, value) {
      // pitching up sounds better than pitching down !?
      var searchPattern = [-1, 1, -2, 2, -3, 3, -4, 4];
      var nearest;

      _.forEach(searchPattern, function(position) {
        nearest = _.find(files, { value: value + position, placeholder: false });
        if (nearest) {
          _.set(nearest, 'transpose', -position);
          // break
          return false;
        }
      });

      return nearest;
    }
    
    return files;
  }


  function processFiles(files, range) {
    var filtered = _.filter(files, validFileName);
    return _.sortBy(
        fillMissingSamples( calcNoteValue( filtered ), range ),
      'value');
  }

  function validFileName(f) {
    return f.name.match(/.wav$/i)
  }


  function init() {
    $scope.filename = "TEST.xml";
    var json = toJson(TEST_XML);
  }
  init();

  $scope.loadFile = function() {
    var f = document.getElementById('file').files[0],
      r = new FileReader();

    if (!f) return;

    $scope.filename = f.name;

    r.onloadend = function(e) {
      var json = toJson(e.target.result);
      $scope.$apply();
    }

    r.readAsBinaryString(f);
  }

  $scope.loadedOSC = function(element, num) {
    var files = document.getElementById('osc' + num + 'files').files;
    var r = new FileReader();

    if (!files) return;
    console.log('​$scope.loadedOSC -> files', files);
    
    // extract file names
    files = _.map(files, function(file) {
      return _.pick(file, 'name');
    });    

    // filter .wav and sort by note value. OSC1 samples are the range reference
    $scope['sampleNames' + num] = processFiles(files, num === 2 ? _.map($scope.sampleNames1, 'value') : null);

    $scope.$apply();
  }


  $scope.generate = function() {
    console.log('​$scope.generate -> generate', $scope.sampleNames1);

    // first sound is clone target for settings
    var cloneTarget = _.cloneDeep($scope.model.kit.soundSources.sound[0]);
    cloneTarget.defaultParams = _.cloneDeep($scope.osc);

    $scope.model.kit.soundSources.sound = _.map($scope.sampleNames1, function (sample) {
      console.log('​$scope.generate -> sample', sample);
      var newSample = _.cloneDeep(cloneTarget);
      
      // only use not value as name, e.g. F#4
      newSample.name = sample.name.match($scope.search)[0]
      
      // Deluge cannot render '#'. F#4 -> FX4
      newSample.name = newSample.name.replace('#', 'X');
      
      // set OSC1 fileName
      newSample.osc1.fileName = $scope.folderName1 + '/' + sample.name;
      // set transpose to 0
      newSample.osc1.transpose = 0;

      transposeNearest(sample.nearest, newSample.osc1, $scope.folderName1);
      
      
      // Find sample with same note for OSC2
      var matchingSampleOsc2 = _.find($scope.sampleNames2, { value: sample.value });
      
      if (matchingSampleOsc2) {
        // set OSC2 fileName
        newSample.osc2.fileName = $scope.folderName2 + '/' + matchingSampleOsc2.name
        transposeNearest(matchingSampleOsc2.nearest, newSample.osc2, $scope.folderName2);
      } else {
        // no sample found for the note, mute OSC2
        newSample.defaultParams.oscBVolume = '0x80000000';
        newSample.osc2.fileName = '';
        console.warn('No matching sample', newSample.name, 'for OSC2 found');
      }

      return newSample;
    });
  }

  function transposeNearest(nearest, osc, folderName) {
    if (!nearest) return;
    // Missing sample? => transpose nearest sample
    osc.fileName = folderName + '/' + nearest.name;
    osc.transpose = nearest.transpose;
  }


  function toJson(xml) {
    // cannot parse xml version statement :p
    xml = xml.replace(/<\?xml .*\?>/, '');

    // one root tag allowed, use wrapper
    var json = x2js.xml_str2json('<wrap>' + xml + '</wrap>').wrap;
    
    // Parse XML numbers
    $scope.model = mapValuesDeep(json, function (value) {
      // dont parse hex numbers
      if (value.startsWith('0x')) return value;
      return isNaN(Number(value)) ? value : Number(value);
    });

    $scope.osc = _.cloneDeep(json.kit.soundSources.sound[0].defaultParams);

    $scope.folderName1 = _.split(json.kit.soundSources.sound[0].osc1.fileName, '/');
    $scope.folderName1.pop();
    $scope.folderName1 = $scope.folderName1.join('/');
    
    $scope.folderName2 = _.split(json.kit.soundSources.sound[0].osc2.fileName, '/');
    $scope.folderName2.pop();
    $scope.folderName2 = $scope.folderName2.join('/');

    var fileNames1 = _.uniq(_.map(json.kit.soundSources.sound, 'osc1.fileName'));
    var fileNames2 = _.uniq(_.map(json.kit.soundSources.sound, 'osc2.fileName'));

    $scope.sampleNames1 = processFiles(_.map(fileNames1, stripFolder))
    // OSC 1 samples are the range reference
    $scope.sampleNames2 = processFiles(_.map(fileNames2, stripFolder), _.map($scope.sampleNames1, 'value'))

    function stripFolder(path) {
      return { name: _.last(path.split('/')) };
    }
    
    return json;
  }


  $scope.saveFile = function() {
    var blob = new Blob([$scope.output], {
      type: 'text/xml'
    });
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, $scope.filename);
    } else {
      var e = document.createEvent('MouseEvents'),
        a = document.createElement('a');
      a.download = $scope.filename;
      a.href = window.URL.createObjectURL(blob);
      a.dataset.downloadurl = ['text/xml', a.download, a.href].join(':');
      e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      a.dispatchEvent(e);
      window.URL.revokeObjectURL(url); // clean the url.createObjectURL resource
    }
  }


  $scope.$watch('model', function(json) {
    console.log('​json', json);
    $scope.output = '<?xml version="1.0" encoding="UTF-8"?>\n' + json2xml(json, "\t");
  }, true);

  $scope.$watch('osc', function(osc) {
    console.log('​osc', osc);
    // _.forEach($scope.model.kit.soundSources.sound, function (sound) {
    //   sound.defaultParams = _.cloneDeep(osc);
    //   // console.log('​', sound);
    // })
  }, true);


 

});