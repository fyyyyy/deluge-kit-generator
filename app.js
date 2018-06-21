var app = angular.module('plunker', ['ngSanitize', 'schemaForm', 'ui.knob']);

var patterns = {
  'note:sign:octave': /(A|B|C|D|E|F|G)(#|b)?(\d)/i,
  'value:value:value': /(0\d\d)|(1\d\d)|(\d\d\.)/
}

app.filter('hex', function () {
  return function(input) {
    var n = UTILS.fixm50to50(input);
    return isNaN(n) ? '' : n;
  };
});

app.filter('hex50', function () {
  return function(input) {
    var n = UTILS.convertHexTo50(input);
    return isNaN(n) ? '' : n;
  };
});


app.filter('highlight', function ($sce) {
  return function (text) {
    if(!text) return '';
    _.forEach(patterns, function (regex) {
      text = text.replace(new RegExp(regex, 'g'), '<span class="highlighted">$1$2$3</span>');
    });
    return $sce.trustAsHtml(text);
  }
})

app.controller('MainCtrl', function($scope) {

  $scope.allNotes = UTILS.allNotes;
  $scope.kitList = null;

  $scope.search = function (fileName) {
    var results = _.map(patterns, function (regex, groups) {
      groups = groups.split(':');
      
      var matches = fileName.match(regex);
      var map = {}
      
      if (matches) {
        _.forEach(groups, function (group, index) {
          map[group] = map[group] || matches[index + 1];
        });
        map.all = matches[0];
      }
      return map;
    });
    
    return _.first(_.reject(results, _.isEmpty));
  };
  window.nsearch = $scope.search;

  $scope.loadKitList = function loadKitList() {
    var url = 'http://flashair/command.cgi?op=100&DIR=/KITS&TIME=';
    var time = new Date().valueOf();
    $scope.loadKitListError = false;

    fetch(url + time).then(function(res) {
      return res.text();
    }).then(function(csv) {
      var lines = csv.split('/')
      lines.shift();
      var array = _.invokeMap(lines, 'split', ',')
      $scope.kitList = _.map(array, '1');
      if(!$scope.$$phase) $scope.$apply(); 
    }, function (e) {
      console.warn('​loadKitList -> FAILED ', e);
      $scope.loadKitListError = true;
      if(!$scope.$$phase) $scope.$apply(); 
    })
  }
  $scope.loadKitList();

  $scope.loadSongList = function loadSongList() {
    var url = 'http://flashair/command.cgi?op=100&DIR=/SONGS&TIME=';
    var time = new Date().valueOf();
    $scope.loadSongListError = false;

    fetch(url + time).then(function(res) {
      return res.text();
    }).then(function(csv) {
      var lines = csv.split('/')
      lines.shift();
      var array = _.invokeMap(_.reverse(lines), 'split', ',')
      $scope.songList = _.map(array, '1');
      if(!$scope.$$phase) $scope.$apply(); 
    }, function (e) {
        console.warn('loadSongList -> FAILED ', e);
        $scope.loadSongListError = true;
        if(!$scope.$$phase) $scope.$apply(); 
    })
  }
  $scope.loadSongList();

  $scope.$watch('kitSelected', function (kitName) {
    $scope.loading = 'Loading...';
    if(kitName) {
      loadFromDownrush('KITS/' + kitName).then(function(xml) {
        $scope.loading = null;
        parseXml(xml, kitName);
        // createKits(1);
      })
    };
  })
  $scope.$watch('songSelected', function (songName) {
    $scope.loading = 'Loading...';
    if(songName) {
      loadFromDownrush('SONGS/' + songName).then(function(xml) {
        $scope.loading = null;
        $scope.songFileName = songName;
        $scope.song = UTILS.toJson(xml);
        if(!$scope.$$phase) $scope.$apply(); 
        console.log('​$scope.song', $scope.song);
        // createKits(1);
      })
    };
  })

  function loadFromDownrush(what) {
    return fetch('http://flashair/' + what).then(function (res) {
      return res.text();
    }).then(function (xml) {
      return xml;
    });
  }

  function saveToDownrush(xml, url) {
    fetch('http://flashair/' + url, { method:'PUT', body: xml });
  }

  $scope.trackKind = UTILS.trackKind;

  $scope.mapMidiCh = function mapMidiCh(where, trackIndex, ch, startNote) {
    $scope.midiError = '';
    var tracks = _.castArray($scope.song.song.tracks.track);
    var track = tracks[trackIndex];
    if(!track) return;

    if (UTILS.trackKind(track) !== 'KIT') {
      $scope.midiError = 'Selected track is NOT a KIT!'
      return;
    }

    var notes = track.noteRows.noteRow
    _.forEach(notes, function (n) {

      if (isNaN(parseInt(n.drumIndex))) return;

      n.soundMidiCommand = {
        channel: Number(ch) - 1,
        note: Number(n.drumIndex) + Number(startNote)
      }
    });

    if (where === 'FILE') UTILS.createDownload(UTILS.toXml($scope.song), $scope.songFileName);
    if (where === 'DOWNRUSH') saveToDownrush(UTILS.toXml($scope.song), 'SONGS/' + $scope.songFileName);
  }


  $scope.loadXmlFile = function() {
    var f = document.getElementById('file').files[0],
      r = new FileReader();

    if (!f) return;
    
    r.onloadend = function(e) {
      parseXml(e.target.result, f.name);
    }

    r.readAsBinaryString(f);
  }

  $scope.loadedOSC = function(element, num) {
    var files = document.getElementById('osc' + num + 'files').files;
    var r = new FileReader();

    if (!files) return;
    console.log('​$scope.loadedOSC -> files', files);
    
    // extract file names
    $scope.files[num] = _.map(files, function(file) {
      return _.pick(file, 'name');
    });

    createKits(num);
  }


  
  console.log('​$scope.allNotes', $scope.allNotes);

  $scope._ = _;
  $scope.naming = "Numeric";
  $scope.files = {};
  $scope.bounds = {};
  $scope.bounds.lower = '21';
  $scope.bounds.upper = '108';
  $scope.bounds.maxTranspose = 48;
  $scope.multi = false;
  $scope.togglePreview  = false;

  $scope.schema = SCHEMA;
  $scope.schema_osc = SCHEMA_OSC;

  $scope.model = {};
  $scope.osc = {};

  $scope.form = [
    '*'
  ];

  $scope.getFileNumber = function() {
    return Number($scope.filename.match(/\d?\d\d\d/));
  }

  function nextFilename(i) {
    var chars = ["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    return $scope.naming === "Numeric" ? 
      $scope.filename.replace(/\d?\d\d\d/, $scope.kitStartNumber + i)
      :
      $scope.filename.replace(/\d?\d\d\d/, ($scope.kitStartNumber +  Math.floor(i / chars.length)) + chars[i % chars.length]);
  }
  
  $scope.nextFilename = nextFilename;
  $scope.fixm50to50 = fixm50to50;
  $scope.toHex = UTILS.toHex;


  



  function calcAllNoteValues(files) {
    var lastValue = 0;
    return _.map(files, function(file) {
      // regex matches
      var matches = $scope.search(file.name);
      
      if (!matches) {
        console.warn('could not identify note in name', matches, file);
      };
      
      var value = Number(matches.value);
      // Calc note value unless known
      file.value = isNaN(value) ? calcNoteValue(matches.note, matches.sign, matches.octave) : value;
      value = isNaN(value) ? ++lastValue : value;

      file.note = UTILS.findNote(file.value);
            
      // This is not a placeholder
      file.placeholder = false;
      
      return file;
    });
  }

  function calcNoteValue(name, sharpOrFlat, octave) {
    var signMap = { '#': 1, 'b': -1 };
    var noteValue = { 'C': 0, 'D': 2, 'E': 4, 'F': 5, 'G': 7, 'A': 9, 'B': 11 };

    // Note Name (C, D, E...)
    var value = noteValue[_.toUpper(name)];

    // Octave (0, 1, 2, 3...)
    value += (Number(octave * 12)) + 12;

    // Sharp or Flat (#, b)
    var sign = sharpOrFlat;
    if (sign) value += signMap[_.toLower(sign)];
    return value;
  }

  function fillMissingSamples(files) {
    var origFiles = _.cloneDeep(files);

    // is the reference for min max note values to fill up
    var min = Number($scope.bounds.lower);
    var max = Number($scope.bounds.upper);

    var noNearest = [];
    var noteRange = max - min + 1;
    

    _.times(noteRange, function (start) {
      var value = min + start;
      var exists = _.find(files, { value: value });

      if (!exists) {
        var noteName = UTILS.findNote(value);
        var nearest = findNearestSample(files, value);

        if (!nearest) {
          noNearest.push(noteName);
          return;
        }
        
        // add placeholder
        files.push({
          name: nearest.name,
          value: value,
          note: nearest.note,
          placeholder: true,
          nearest: nearest
        });
      }
    });
    if (files.length && noNearest.length) console.warn('no Nearest sample found for ', origFiles, "\n", noNearest.join(', '));


    function findNearestSample(files, value) {
      var searchPattern = _.flatten(_.map(_.range(1, $scope.bounds.maxTranspose + 1), function(i) {
        // pitching up sounds better than pitching down !?
        return [-i, i];
      }));

      var nearest = null;

      _.forEach(searchPattern, function(position) {
        nearest = _.find(files, { value: value + position, placeholder: false });
        if (nearest) {
          _.set(nearest, 'transpose', -position);
          // break
          return false;
        }
      });

      var clone =  _.cloneDeep(nearest);
      _.set(clone, 'note', UTILS.findNote(value));
      return clone;
    }
    return files;
  }


  function filesToSamples(files) {
    if (!files) return [];

    var filtered = _.filter(files, validFileName);
    return _.sortBy(
        fillMissingSamples( calcAllNoteValues(filtered) ),
      'value');
  }

  function validFileName(f) {
    return f.name.match(/.wav$/i)
  }


  function init() {
    parseXml(TEST_XML, "KIT123.XML");
  }
  init();

  

  function createKits(num) {
    console.log('​createKits -> num', num);
    // MULTIPLE KITS ?
    $scope.multi ? createMultiKits(num) : createSingleKit(num);
  }

  function stripNotesFromFileName(name) {
    // check for multi match
    _.times(5, function() {
      var match = $scope.search(name);
      name = match && name.split(match.all).join('') || name;
    });
    return name;
  }

  function createMultiKits(num) {
    var categories = {};

    // clear
    $scope['sampleCategories' + num] = {};

    _.forEach($scope.files[num], function (file) {
      var category = stripNotesFromFileName(file.name);

      if (category) {
        category = category.replace(/.wav/gi, '');
        categories[category] = categories[category] || [];
        categories[category].push(file);
      }
    });

    _.forEach(categories, function (files, category) {
      $scope['sampleCategories' + num][category] = filesToSamples(files);
    })

    if(!$scope.$$phase) $scope.$apply(); 
  }


  function createSingleKit(num) {
    // filter .wav and sort by note value
    $scope['sampleCategories' + num] = {
      samples: filesToSamples($scope.files[num])
    };
    console.log('​createSingleKit ->', num, $scope['sampleCategories' + num]);

    if(!$scope.$$phase) $scope.$apply(); 
  }


  $scope.generateXml = function(category) {
    if (category) {
      var sampleNames = $scope.sampleCategories1[category];
  
      // first sound is clone target for settings
      var cloneTarget = _.cloneDeep($scope.model.kit.soundSources.sound[0]);
      cloneTarget.defaultParams = _.cloneDeep($scope.osc);
  
      $scope.model.kit.soundSources.sound = _.map(sampleNames, createSoundXml.bind(cloneTarget, category));
  
      $scope.output = UTILS.toXml($scope.model);
      return;
    }
  }

  function createSoundXml(category, sample) {
    var newSound = _.cloneDeep(this);

    // only use note value as name, e.g. F#4
    newSound.name = sample.note;
    
    if(!newSound.name) console.warn('no name found -> ', sample);
    
    // Deluge cannot render '#'. F#4 -> FX4
    newSound.name = newSound.name.replace('#', 'X');

    // set OSC1 fileName
    newSound.osc1.fileName = $scope.folderName1 + '/' + sample.name;
    // set transpose to 0
    newSound.osc1.transpose = 0;
    newSound.osc2.transpose = 0;

    transposeNearest(sample.nearest, newSound.osc1, $scope.folderName1);


    // Find sample with same note for OSC2
    var matchingSampleOsc2 = _.find($scope.sampleCategories2[category], { value: sample.value });

    if (matchingSampleOsc2) {
      // set OSC2 fileName
      newSound.osc2.fileName = $scope.folderName2 + '/' + matchingSampleOsc2.name
      transposeNearest(matchingSampleOsc2.nearest, newSound.osc2, $scope.folderName2);
    } else {
      // no sample found for the note, mute OSC2
      newSound.defaultParams.oscBVolume = '0x80000000';
      newSound.osc2.fileName = '';
      console.warn('No matching sample', newSound, '(', sample, ') for OSC2 found');
    }

    return newSound;
  }

  function transposeNearest(nearest, osc, folderName) {
    if (!nearest) return;
    // Missing sample? => transpose nearest sample
    
    // console.log('​transposeNearest -> ', nearest.name, nearest.transpose);
    osc.fileName = folderName + '/' + nearest.name;
    osc.transpose = nearest.transpose;
  }


  function parseXml(xml, fileName) {
    var json = UTILS.toJson(xml);

    $scope.filename = fileName;
    $scope.kitStartNumber = $scope.getFileNumber();
    
    // Parse XML numbers
    $scope.model = UTILS.mapValuesDeep(json, UTILS.parseNumber);

    $scope.osc = _.cloneDeep(json.kit.soundSources.sound[0].defaultParams);

    // process files 1 and 2
    _.each([1, 2], function(n) {
        $scope['folderName' + n] = UTILS.extractFolderName(json.kit.soundSources.sound[0]['osc' + n].fileName)
                                  || 'SAMPLES/PLEASE/SPECIFY/PATH';

      $scope.files[n] = _.filter(_.map($scope.model.kit.soundSources.sound, function (sound) {
        // console.log('​parseXml -> sound', sound);

        var osc = sound['osc' + n];

        var fileName = UTILS.stripFolder(osc.fileName);
        if(!fileName) return false;

        var name = isNaN(parseInt(sound.name)) ? 
          sound.name.toString().replace('X', '#')
          :
          UTILS.findNote(sound.name);


        var value = UTILS.findValue(name);
        var transpose = Number(osc.transpose);
        
        var nearest = transpose && {
          transpose: transpose,
          name: fileName,
          value: value
        }

        var file = {
          name: fileName,
          placeholder: !!nearest,
          nearest: nearest,
          note: name,
          value: value
        };
        
        return file;
      }));
      
      // var fileNames = _.uniq(_.map(json.kit.soundSources.sound, 'osc' + n + '.fileName'));
      $scope['sampleCategories' + n] = {
        samples: $scope.files[n]
      }
    });

    if(!$scope.$$phase) $scope.$apply(); 

    return json;
  }
  

  $scope.saveAll = function () {
    _.map(_.keys($scope.sampleCategories1), function (category, i) {
      $scope.saveFile(category, i);
    });
  }

  $scope.saveFile = function(category, i) {
    
    $scope.generateXml(category);
    
    // pick next number for filename
    var filename = nextFilename(i || 0);
    console.log('saveFile', filename, category);

    UTILS.createDownload($scope.output, filename);
  }

  $scope.$watch('model', function(json) {
    console.log('$scope.model', json);
    $scope.output = UTILS.toXml(json);
  }, true);

  $scope.$watch('bounds', function() {
    createKits(1);
    createKits(2);
  }, true);
  
  $scope.$watch('folderName1', function() {
    // createKits(1);
  });
  $scope.$watch('folderName2', function() {
    // createKits(2);
  });


  $scope.$watch('osc', function(osc) {
    console.log('​global settings changed', osc);
    // _.forEach($scope.model.kit.soundSources.sound, function (sound) {
    //   sound.defaultParams = _.cloneDeep(osc);
    //   // console.log('​', sound);
    // })
  }, true);


 

});