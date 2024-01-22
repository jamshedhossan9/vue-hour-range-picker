# Vue Hour Range Picker

**vue-hour-range-picker** is a Vue component which lets you select hours in weekly timeframe. Select and drag the mouse from starting to end hour block. It works with touch devices also and fully responsive.

It is currently compatible with **Vue3** only.


<p align="center">
    <img src="https://github.com/jamshedhossan9/vue-hour-range-picker/blob/main/screenshots/vue-hour-range-picker-light.png?raw=true" width="400" > &nbsp; &nbsp;
    <img src="https://github.com/jamshedhossan9/vue-hour-range-picker/blob/main/screenshots/vue-hour-range-picker-dark.png?raw=true" width="400" >
</p>

### Installation
```
npm install vue-hour-range-picker
```

### Import
```
import { HourRangePicker, type HourRangePickerType } from 'vue-hour-range-picker';
import 'vue-hour-range-picker/style.css'; 
```

### Usage
```

html:
    <HourRangePicker v-model="value1"></HourRangePicker>

js:
    import { ref } from 'vue';
    import { HourRangePicker, type HourRangePickerType } from 'vue-hour-range-picker';
    import 'vue-hour-range-picker/style.css';

    const value1 = ref<HourRangePickerType>();
    
```

## Docs

For documentation and demo, see: https://jamshedhossan9.github.io/vue-hour-range-picker/

## Contact

For bug reports and feature requests, please [open an issue](https://github.com/jamshedhossan9/vue-hour-range-picker/issues/new) here on GitHub.

## License

MIT

Copyright (C) 2024 - Jamshed Hossan

