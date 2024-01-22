

<template>
    <div class="container p-3">
        
        <div class="row g-5 g-sm-3 g-md-5 flex-nowrap document">
            <div class="left-column col-auto" :class="{'sidebar-open': sideBarOpen}">
                <div class="backdrop" @click.prevent="sideBarOpen = !sideBarOpen"></div>
                <div class="d-flex flex-column sidebar-menu">
                    <ul class="nav flex-column">
                        <li class="nav-item">
                            <a href="https://github.com/jamshedhossan9/vue-hour-range-picker" target="_blank" class="nav-link">
                                Github <small>&#8599;</small>
                            </a>
                        </li>
                        <li class="nav-item mt-2">
                            <a class="nav-link active" href="#" @click.prevent="goTo($event, sectionIntroduction)">Introduction</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#" @click.prevent="goTo($event, sectionImport)">Import</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#" @click.prevent="goTo($event, sectionBasic)">Basic</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#" @click.prevent="goTo($event, sectionCustomColor)">Custom Color</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#" @click.prevent="goTo($event, sectionCustomColorDark)">Dark</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#" @click.prevent="goTo($event, sectionResponsive)">Responsive</a>
                        </li>
                        <li class="nav-item mt-4">
                            <a class="nav-link" href="#" @click.prevent="goTo($event, sectionProps)">Props</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#" @click.prevent="goTo($event, sectionEmits)">Emits</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#" @click.prevent="goTo($event, sectionMethods)">Methods</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#" @click.prevent="goTo($event, sectionTypes)">Types</a>
                        </li>
                    </ul>
                </div>
                
            </div>
            <div class="right-column col" ref="sectionIntroduction" :style="{minWidth: '1px'}">
                <div class="mb-2 d-flex gap-3 align-items-center flex-wrap" >
                    <a href="#" class="menu-toggle" @click.prevent="sideBarOpen = !sideBarOpen">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </a>
                    <h3 class="fs-4 m-0 flex-grow-1">Vue Hour Range Picker</h3>
                </div>
                <div class="d-flex flex-column">
                    <div class="py-4 border-bottom">
                        <strong>vue-hour-range-picker</strong> is a Vue component which lets you select hour ranges in weekly timeframe. 
                        Select and drag the mouse from starting to end hour block. 
                        It works with touch devices also and fully responsive. 
                        <br>
                        <br>
                        It is currently compatible with <strong>Vue3</strong> only.
                    </div>
                    <div class="py-4 border-bottom" ref="sectionImport">
                        <h5 class="title-2 mb-2">Import:</h5>
                        <div>

                            <pre class="code-block">{{ sectionImportHtml }}</pre>
                        </div>
                    </div>
                    <div class="py-4 border-bottom" ref="sectionBasic">
                        <div class="d-flex">
                            <div class="flex-grow-1">
                                <h5 class="title-2 mb-2">Basic:</h5>
                            </div>
                            <div class="flex-none d-flex align-items-center gap-4">
                                <div>
                                    <label for="">
                                        <input class="form-check-input" type="checkbox" v-model="value1Disabled">
                                        <span class="ps-1" @click="value1Disabled = !value1Disabled">Disable</span>
                                    </label>
                                </div>
                                <div>
                                    <label for="">
                                        <input class="form-check-input" type="checkbox" v-model="value1Note">
                                        <span class="ps-1" @click="value1Note = !value1Note">Note</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="hour-range-picker-test">
                            <HourRangePicker 
                                v-model="value1" 
                                :disabled="value1Disabled"
                                :add-note="value1Note"
                                @update:modelValue="updated"
                                @selected="selected"
                                @unselected="unselected"
                            >
                            </HourRangePicker>
                        </div>
                        <div v-if="value1" class="pt-3">
                            <div v-if="value1" class="fs-6 pb-1 fw-bold">Value:</div>
                            <div v-if="value1" class="border rounded px-3 py-2 fs-7">
                                <small>
                                        {{ value1 }}
                                </small>
                            </div>
                        </div>
                        <div class="pt-3">
                            <div class="fs-6 pb-1 fw-bold">Usage:</div>
                            <pre class="code-block">{{ sectionBasicHtml }}</pre>
                        </div>
                        
                    </div>
                    <div class="py-4 border-bottom" ref="sectionCustomColor">
                        <h5 class="title-2 mb-2">Custom Color:</h5>
                        <div class="hour-range-picker-test">
                            <HourRangePicker 
                                v-model="value2" 
                                blockColor="#2aa99e" 
                                borderColor="#d5dcdc" 
                                labelColor="#2aa99e" 
                                labelMutedColor="#afbbbb" 
                                borderWidth="2px"
                                rounded=".5rem"
                                @update:modelValue="updated"
                                @selected="selected"
                                @unselected="unselected"
                                clear-icon-color="#457d7d">
                            </HourRangePicker>
                        </div>
                        <div class="pt-3">
                            <div class="fs-6 pb-1 fw-bold">Usage:</div>
                            <pre class="code-block">{{ sectionCustomColorHtml }}</pre>
                        </div>
                    </div>
                    <div class="py-4 border-bottom" ref="sectionCustomColorDark">
                        <h5 class="title-2 mb-2">Dark:</h5>
                        <div class="p-3 rounded" :style="{backgroundColor:'#0b283c'}">
                            <div class="hour-range-picker-test">
                                <HourRangePicker 
                                    v-model="value3" 
                                    blockColor="#7ea3bb" 
                                    borderColor="#516d82" 
                                    labelColor="#cee7e5" 
                                    labelMutedColor="#738a9c" 
                                    borderWidth="2px"
                                    rounded=".5rem"
                                    clear-icon-color="#7ea3bb">
                                </HourRangePicker>
                            </div>
                        </div>
                        <div class="pt-3">
                            <div class="fs-6 pb-1 fw-bold">Usage:</div>
                            <pre class="code-block">{{ sectionCustomColorDarkHtml }}</pre>
                        </div>
                    </div>
                    <div class="py-4 border-bottom" ref="sectionResponsive">
                        <div class="d-flex">
                            <div class="flex-grow-1">
                                <h5 class="title-2 mb-2">Responsive:</h5>
                            </div>
                            <div class="flex-none d-flex align-items-center gap-4">
                                <div>
                                    <label for="">
                                        <input class="form-check-input" type="checkbox" v-model="autoScale" @input="componentResponsive.resize();">
                                        <span class="ps-1" @click="autoScale = !autoScale; componentResponsive.resize();">Auto Scale</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="">
                                <div class="hour-range-picker-test hour-range-picker-test-resizable"  ref="sectionResponsiveResizer">
                                    <HourRangePicker :add-note="false" borderWidth="4px" rounded="10px" ref="componentResponsive"></HourRangePicker>
                                </div>
                        </div>
                        <div class="pt-3">
                            The component is inside a resizeable element. Try to resize it to see the responsiveness without <strong>Window resize</strong> event.
                            <br>
                            You have to use <strong>resize()</strong> method to re-render the component when its width changes without <strong>Window resize</strong> event.
                        </div>
                        <div class="pt-3">
                            <div class="fs-6 pb-1 fw-bold">Example:</div>
                            <pre class="code-block">{{ sectionResponsiveHtml }}</pre>
                        </div>
                    </div>
                    <div class="py-4 border-bottom" ref="sectionProps">
                        <h5 class="title-2 mb-2">Props:</h5>
                        <div class="table-responsive">
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Type</th>
                                        <th>Default</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>modelValue</td>
                                        <td>HourRangePickerType | null</td>
                                        <td>null</td>
                                        <td>
                                            <div>Value of the component.</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>labelColor</td>
                                        <td>String</td>
                                        <td>#000000</td>
                                        <td>
                                            <div>Label color for selected Hour and Day.</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>labelMutedColor</td>
                                        <td>String</td>
                                        <td>#999999</td>
                                        <td>
                                            <div>Label color for unselected Hour and Day.</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>blockColor</td>
                                        <td>String</td>
                                        <td>#333333</td>
                                        <td>
                                            <div>Background color of Hour blocks.</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>borderColor</td>
                                        <td>String</td>
                                        <td>#dfdfdf</td>
                                        <td>
                                            <div>Border color of Grids.</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>borderWidth</td>
                                        <td>String</td>
                                        <td>1px</td>
                                        <td>
                                            <div>Border width of Grids. CSS supported unit for border-width.</div>
                                            <div>Forced to <strong>1px</strong> if the component's width is under <strong>500px</strong></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>rounded</td>
                                        <td>String</td>
                                        <td>0px</td>
                                        <td>
                                            <div>Border radius for whole component. CSS supported unit for border-radius.</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>clearIconColor</td>
                                        <td>String</td>
                                        <td>#aaaaaa</td>
                                        <td>
                                            <div>Color of Clear Icon.</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>fontSize</td>
                                        <td>String</td>
                                        <td>null</td>
                                        <td>
                                            <div>CSS supported font-size.</div>
                                            <div>If not present, it will auto render font size based on component width. Max is 14px.</div>
                                            <div>If present in fixed unit, it won't change font-size based on component width or viewport.</div>
                                            <div>If you want to control font-size responsiveness, you can set this value <strong>'100%'</strong>. Then you can set your font-size in component container with media queries to make it responsive.</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>disabled</td>
                                        <td>Boolean</td>
                                        <td>false</td>
                                        <td>
                                            <div>When present, it specifies that the component should be disabled.</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>addNote</td>
                                        <td>Boolean</td>
                                        <td>true</td>
                                        <td>
                                            <div>Used to pass a note describing how to unselect a selected range.</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>notePosition</td>
                                        <td>'left' | 'center' | 'right'</td>
                                        <td>left</td>
                                        <td>
                                            <div>Horizontal position of the note.</div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="py-4 border-bottom" ref="sectionEmits">
                        <h5 class="title-2 mb-2">Emits:</h5>
                        <div class="table-responsive">
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Parameters</th>
                                        <th>ReturnType</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>update:modelValue</td>
                                        <td>value: HourRangePickerType | null</td>
                                        <td>void</td>
                                        <td>
                                            <div>Emitted when the value changes.</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>selected</td>
                                        <td>value: HourRangePickerType</td>
                                        <td>void</td>
                                        <td>
                                            <div>Emitted after selecting new block or range.</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>unselected</td>
                                        <td>value: HourRangePickerType</td>
                                        <td>void</td>
                                        <td>
                                            <div>Emitted after unselecting a block or range.</div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="py-4 border-bottom" ref="sectionMethods">
                        <h5 class="title-2 mb-2">Methods:</h5>
                        <div class="table-responsive">
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Parameter</th>
                                        <th>ReturnType</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>clear</td>
                                        <td></td>
                                        <td>Void</td>
                                        <td>
                                            <div>Clears the selector.</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>resize</td>
                                        <td></td>
                                        <td>Void</td>
                                        <td>
                                            <div>Resizes the component.</div>
                                            <div>If component's width changes without Window resize event, this method can be used to re-render the component.</div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="py-4 pb-5" ref="sectionTypes">
                        <h5 class="title-2 mb-2">Types:</h5>
                        <div class="table-responsive">
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>HourRangePickerType</td>
                                        <td>
                                            <div>Type of modelValue.</div>
                                            <div>
                                                import { type HourRangePickerType } from 'vue-hour-range-picker'
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        
        
    </div>
    
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import HourRangePicker from '../src/components/HourRangePicker.vue'
    import type { HourRangePickerType } from '../src/types/HourRangePickerType'
    import './style.scss'
    import { useResizeObserver } from '@vueuse/core'

    const sideBarOpen = ref(false);
    const sectionIntroduction = ref();
    const sectionImport = ref();
    const sectionBasic = ref();
    const sectionCustomColor = ref();
    const sectionCustomColorDark = ref();
    const sectionResponsive = ref();
    const sectionResponsiveResizer = ref();
    const componentResponsive = ref();
    const sectionProps = ref();
    const sectionEmits = ref();
    const sectionMethods = ref();
    const sectionTypes = ref();

    const goTo = (e: any, el: any) => {
        console.log(e.target)
        console.log(el)
        let links = document.querySelectorAll('.sidebar-menu .nav-link.active');
        if(links && links.length){
            for(let item of links){
                item.classList.remove('active');
            }
        }
        e.target.classList.add('active');
        window.scrollTo({
            top: el.offsetTop,
            behavior: 'smooth',
        })
        sideBarOpen.value = false;
    }

    let sectionImportHtml = `import { HourRangePicker, type HourRangePickerType } from 'vue-hour-range-picker';
import 'vue-hour-range-picker/style.css';`;

    let sectionBasicHtml = `html:
    <HourRangePicker 
        v-model="value1" 
        :disabled="isDisabled" 
        :add-note="showNote">
    </HourRangePicker>

js:
    import { ref } from 'vue';
    import { HourRangePicker, type HourRangePickerType } from 'vue-hour-range-picker';
    import 'vue-hour-range-picker/style.css';

    const value1 = ref<HourRangePickerType>();
    const isDisabled = ref(false);
    const showNote = ref(true);
`;

    let sectionCustomColorHtml = `html:
    <HourRangePicker 
        v-model="value1" 
        blockColor="#2aa99e" 
        borderColor="#d5dcdc" 
        labelColor="#2aa99e" 
        labelMutedColor="#afbbbb" 
        borderWidth="2px"
        rounded=".5rem"
        clear-icon-color="#457d7d"
    ></HourRangePicker>

js:
    import { ref } from 'vue';
    import { HourRangePicker, type HourRangePickerType } from 'vue-hour-range-picker';
    import 'vue-hour-range-picker/style.css';

    const value1 = ref<HourRangePickerType>();
    value1.value = {
        "tuesday": {
            "5": true,
            "6": true,
            "7": true,
            "8": true,
            "9": true,
            "10": true
        },
        "wednesday": {
            "5": true,
            "6": true,
            "7": true,
            "8": true,
            "9": true,
            "10": true
        }
    };
`;
    let sectionCustomColorDarkHtml = `html:
    <HourRangePicker 
        v-model="value1" 
        blockColor="#7ea3bb" 
        borderColor="#516d82" 
        labelColor="#cee7e5" 
        labelMutedColor="#738a9c" 
        borderWidth="2px"
        rounded=".5rem"
        clear-icon-color="#7ea3bb">
    </HourRangePicker>

js:
    import { ref } from 'vue';
    import { HourRangePicker, type HourRangePickerType } from 'vue-hour-range-picker';
    import 'vue-hour-range-picker/style.css';

    const value1 = ref<HourRangePickerType>();
    value1.value = {
        "monday":{
            "8":true,
            "9":true,
            "10":true,
            "11":true,
            "12":true,
            "13":true,
            "14":true,
            "15":true,
            "16":true
        },
        "tuesday":{
            "8":true,
            "9":true,
            "10":true,
            "11":true,
            "12":true,
            "13":true,
            "14":true,
            "15":true,
            "16":true
        },
        "wednesday":{
            "8":true,
            "9":true,
            "10":true,
            "11":true,
            "12":true,
            "13":true,
            "14":true,
            "15":true,
            "16":true
        },
        "friday":{
            "11":true,
            "12":true,
            "13":true,
            "14":true,
            "15":true,
            "16":true
        },
        "saturday":{
            "11":true,
            "12":true,
            "13":true,
            "14":true,
            "15":true,
            "16":true
        }
    };
`;
    let sectionResponsiveHtml = `html:
    <label>
        <input type="checkbox" v-model="autoScale" @input="componentResponsive.resize();"> 
        <span @click="autoScale = !autoScale; componentResponsive.resize();">Auto Scale</span>
    </label>
    <div ref="sectionResponsiveResizer">
        <HourRangePicker 
            :add-note="false" 
            borderWidth="4px" 
            ref="componentResponsive">
        </HourRangePicker>
    </div>

js:
    import { ref } from 'vue';
    import { HourRangePicker, type HourRangePickerType } from 'vue-hour-range-picker';
    import 'vue-hour-range-picker/style.css';
    import { useResizeObserver } from '@vueuse/core';
    
    const sectionResponsiveResizer = ref();
    const autoScale = ref(true);
    useResizeObserver(sectionResponsiveResizer, (entries) => {
        if(componentResponsive.value && autoScale.value){
            componentResponsive.value.resize();
        }
    })
`;

    

    const value1 = ref<HourRangePickerType>();
    const value1Disabled = ref(false);
    const value1Note = ref(true);
    const value2 = ref<HourRangePickerType>();
    value2.value = {
        "tuesday": {
            "5": true,
            "6": true,
            "7": true,
            "8": true,
            "9": true,
            "10": true
        },
        "wednesday": {
            "5": true,
            "6": true,
            "7": true,
            "8": true,
            "9": true,
            "10": true
        }
    };

    const value3 = ref<HourRangePickerType>();
    value3.value = {
        "monday":{
            "8":true,
            "9":true,
            "10":true,
            "11":true,
            "12":true,
            "13":true,
            "14":true,
            "15":true,
            "16":true
        },
        "tuesday":{
            "8":true,
            "9":true,
            "10":true,
            "11":true,
            "12":true,
            "13":true,
            "14":true,
            "15":true,
            "16":true
        },
        "wednesday":{
            "8":true,
            "9":true,
            "10":true,
            "11":true,
            "12":true,
            "13":true,
            "14":true,
            "15":true,
            "16":true
        },
        "friday":{
            "11":true,
            "12":true,
            "13":true,
            "14":true,
            "15":true,
            "16":true
        },
        "saturday":{
            "11":true,
            "12":true,
            "13":true,
            "14":true,
            "15":true,
            "16":true
        }
    };

    const autoScale = ref(true);
    useResizeObserver(sectionResponsiveResizer, (entries) => {
        const entry = entries[0]
        const { width, height } = entry.contentRect
        if(componentResponsive.value && autoScale.value){
            componentResponsive.value.resize();
        }
    })

    const updated = (e: any) => {
        console.log('updated', e)
    }
    const unselected = (e: any) => {
        console.log('unselected', e)
    }
    const selected = (e:any) => {
        console.log('selected', e)
    }
</script>