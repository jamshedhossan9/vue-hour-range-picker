<template>
    <div class="hour-range-picker">
        <!-- @mouseout="mouseOutHandler" -->
        <table
            class="hour-range-picker-table"
            cellpadding="0"
            cellspacing="0"
            @mousedown="mouseDownHandler"
            @mousemove="mouseMoveHandler"
            @mouseup="mouseUpHandler"
            @touchstart="mouseDownHandler"
            @touchmove="mouseMoveHandler"
            @touchend="mouseUpHandler"
            :style="{
                // pointerEvents: props.disabled ? 'none' : 'auto',
                cursor: props.disabled ? 'not-allowed' : 'default'
            }"
        >
            <tbody>
                <tr>
                    <td :style="cellStyle(0, 0)" ref="firstCell" class="clear-icon-cell">
                        <span class="clear-icon" v-if="!props.disabled" :style="{color: props.clearIconColor}">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="svg-icon">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </span>
                    </td>
                    <td v-for="i in 24" :key="i" :style="cellStyle(0, i)">
                        <span class="hour-name" :class="mutedHours[i-1] ? 'hour-muted' : ''" :style="labelStyle(mutedHours[i-1])">
                            <span class="hour-name-child">
                                {{ i < 10 ? '0' + i : i }}
                            </span>
                        </span>
                    </td>
                </tr>
                <tr v-for="(items, i) in timeTable">
                    <td :style="cellStyle(i+1, 0)">
                        <span
                            class="day-name"
                            :class="mutedWeekDays[weekdays[i].key] ? 'day-muted' : ''" 
                            :style="labelStyle(mutedWeekDays[weekdays[i].key])"
                        >
                            <span class="day-name-child">
                                {{ weekdays[i].name.substring(0, 2).toLocaleUpperCase() }}
                            </span>
                        </span>
                    </td>
                    <td
                        v-for="(item, j) in items"
                        :class="hourBlockClass(item)"
                        :data-pos-i="i"
                        :data-pos-j="j"
                        :style="cellStyle(i+1, j+1)"
                    >
                        <span :data-pos-i="i" :data-pos-j="j" class="hour-block" :style="{
                            backgroundColor: props.blockColor,
                            borderBottomRightRadius: props.rounded && i == 6 && j == 23 ? props.rounded : 0,
                        }">
                            <!-- <span class="hour-block-child"></span> -->
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-if="props.addNote">
            <small class="note" :style="{
                display: 'block',
                textAlign: props.notePosition as 'left' | 'center' | 'right',
            }">
                Note: To uncheck a range, you have to keep all block already checked within that range.
            </small>
        </div>
    </div>
</template>
<script setup lang="ts">
/*
{
    'monday': {
        '0': true,
        '5': true
    }
}
[
    [ false, false, true, true, ...//24 times], 
    ...
    ...
    7 times
]
*/
import { ref, onMounted, watch } from 'vue'
import type { PropType } from 'vue'
import type { WeekType, HourRangePickerType } from '../types/HourRangePickerType'


const props = defineProps({
    modelValue: {
        type: Object as PropType<HourRangePickerType>,
        default: null
    },
    weekdays: {
        type: Object as PropType<WeekType>,
        default: null
    },
    addNote: {
        type: Boolean,
        default: true
    },
    notePosition: {
        type: String,
        default: 'left',
        validator(value: string) {
            return ['left', 'center', 'right'].includes(value)
        }
    },
    labelColor:{
        type: String,
        default: '#000000',
    },
    labelMutedColor:{
        type: String,
        default: '#999999',
    },
    blockColor:{
        type: String,
        default: '#000000',
    },
    borderColor:{
        type: String,
        default: '#eeeeee',
    },
    borderWidth:{
        type: String,
        default: '2px',
    },
    rounded:{
        type: String,
        default: '2px',
    },
    clearIconColor:{
        type: String,
        default: '#aaaaaa',
    },
    disabled:{
        type: Boolean,
        default: false,
    }
})

const emit = defineEmits(['update:modelValue'])

// days: ['sunday','monday','tuesday','wednesday','thursday','friday','saturday']
let weekdays: WeekType = [
    {
        key: 'monday',
        name: 'Monday',
        muted: false
    },
    {
        key: 'tuesday',
        name: 'Tuesday',
        muted: false
    },
    {
        key: 'wednesday',
        name: 'Wednesday',
        muted: false
    },
    {
        key: 'thursday',
        name: 'Thursday',
        muted: false
    },
    {
        key: 'friday',
        name: 'Friday',
        muted: false
    },
    {
        key: 'saturday',
        name: 'Saturday',
        muted: true
    },
    {
        key: 'sunday',
        name: 'Sunday',
        muted: true
    }
]

let weekdaysByKey: any = {}
let mutedWeekDaysDefault: any = {}
let mutedHoursDefault: any = {}
for (const [index, value] of weekdays.entries()) {
    weekdaysByKey[value.key] = { ...value, index: index }
    mutedWeekDaysDefault[value.key] = true
}

for (let i = 0; i < 24; i++) {
    mutedHoursDefault[i] = true
}

let timeTableDefault: any = []
for (let i = 0; i < weekdays.length; i++) {
    timeTableDefault[i] = []
    for (let j = 0; j < 24; j++) {
        timeTableDefault[i][j] = {
            checked: false,
            highlight: false
        }
    }
}

const _parseInt = (num: string | number) => {
    let output = 0
    if (typeof num === 'number') output = Math.trunc(num)
    else output = parseInt(num.trim())

    if (isNaN(output)) {
        output = 0
    }
    return output
}

const selectStartPos = ref()
const timeTable = ref([...timeTableDefault])
const mutedWeekDays = ref({ ...mutedWeekDaysDefault })
const mutedHours = ref({ ...mutedHoursDefault })

const mutedDaysHoursDefault = () => {
    mutedWeekDays.value = { ...mutedWeekDaysDefault }
    mutedHours.value = { ...mutedHoursDefault }
}

const modelValueToTimeTable = () => {
    mutedDaysHoursDefault()
    if (props.modelValue) {
        for (const x in props.modelValue) {
            if (props.modelValue.hasOwnProperty(x)) {
                if (typeof weekdaysByKey[x] !== 'undefined') {
                    const dayIndex = weekdaysByKey[x].index
                    for (const y in props.modelValue[x]) {
                        if (props.modelValue[x].hasOwnProperty(y)) {
                            const hourIndex = _parseInt(y)
                            if (hourIndex >= 0 && hourIndex <= 23) {
                                timeTable.value[dayIndex][hourIndex].checked = props.modelValue[x][y]
                                if (timeTable.value[dayIndex][hourIndex].checked) {
                                    mutedWeekDays.value[x] = false
                                    mutedHours.value[hourIndex] = false
                                }
                            }
                        }
                    }
                }
            }
        }
    } else {
        timeTable.value = [...timeTableDefault]
    }
    // console.log(mutedWeekDays.value, mutedHours.value)
}

const timeTableToModelValue = () => {
    let tempModelValue: HourRangePickerType = {}
    mutedDaysHoursDefault()
    for (let i = 0; i < timeTable.value.length; i++) {
        for (let j = 0; j < timeTable.value[i].length; j++) {
            if (timeTable.value[i][j].checked) {
                const day = weekdays[i].key
                if (typeof tempModelValue[day] === 'undefined') {
                    tempModelValue[day] = {}
                }
                tempModelValue[day][j] = true
                mutedWeekDays.value[day] = false
                mutedHours.value[j] = false
            }
        }
    }
    emit('update:modelValue', tempModelValue)
}

onMounted(() => {
    modelValueToTimeTable()
    onResize();
})

watch(
    () => props.modelValue,
    () => {
        modelValueToTimeTable()
    }
)

const hourBlockClass = (item: any) => {
    let c = ' hour-block-cell '
    if (item.checked) {
        c += ' hour-block-checked '
    } else {
        c += ' hour-block-unchecked '
    }
    if (item.highlight) {
        c += ' hour-block-hightlight '
    }
    return c
}

const firstCell = ref();
const fontSize = ref('100%');
const borderWidth = ref(props.borderWidth);

const onResize = () => {
    if(firstCell.value){
        let width: number = firstCell.value.offsetWidth;
        console.log(width)
        let tempFontSize = Math.max(width/3, 4);
        fontSize.value = `${tempFontSize}px`;
        if(width > 30){
            borderWidth.value = props.borderWidth;
        }
        else{
            borderWidth.value = '1px';
        }
    }
    else{
        fontSize.value = '100%';
    }
}
window.addEventListener('resize', onResize)

const cellStyle = (i: number, j: number) => {
    let style: any = {};
    style.borderColor = props.borderColor;
    style.borderWidth = 0;
    style.borderTopWidth = borderWidth.value;
    style.borderRightWidth = borderWidth.value;
    if(j == 0){
        style.borderLeftWidth = borderWidth.value;
    }
    if(i == 7){
        style.borderBottomWidth = borderWidth.value;
    }
    style.borderRadius = 0;
    if(props.rounded){
        if(i == 0 && j == 0){
            style.borderTopLeftRadius = props.rounded;
        }
        if(i == 0 && j == 24){
            style.borderTopRightRadius = props.rounded;
        }
        if(i == 7 && j == 0){
            style.borderBottomLeftRadius = props.rounded;
        }
        if(i == 7 && j == 24){
            style.borderBottomRightRadius = props.rounded;
        }
    }
    if(props.disabled){
        style.pointerEvents = 'none';
    }
    return style;
}

const labelStyle = (muted: boolean = false) => {
    let style: any = {};
    style.color = muted ? props.labelMutedColor : props.labelColor;
    style.fontSize = fontSize.value;

    return style;
}

const clearTable = () => {
    // alert('here')
    for (let i = 0; i < timeTable.value.length; i++) {
        for (let j = 0; j < timeTable.value[i].length; j++) {
            timeTable.value[i][j].checked = false
            timeTable.value[i][j].highlight = false
        }
    }
    mutedDaysHoursDefault()
    emit('update:modelValue', null)
    closeAction = false;
}

const checkOperation = (xy1param: any, xy2param: any) => {
    let xy1 = {
        i: Math.min(xy1param.i, xy2param.i),
        j: Math.min(xy1param.j, xy2param.j)
    }
    let xy2 = {
        i: Math.max(xy1param.i, xy2param.i),
        j: Math.max(xy1param.j, xy2param.j)
    }
    // console.log(xy1, xy2)
    let isAllChecked = true
    for (let i = xy1.i; i <= xy2.i && isAllChecked; i++) {
        for (let j = xy1.j; j <= xy2.j && isAllChecked; j++) {
            if (!timeTable.value[i][j].checked) {
                isAllChecked = false
            }
        }
    }

    let check = !isAllChecked
    // console.log('check', check)
    for (let i = xy1.i; i <= xy2.i; i++) {
        for (let j = xy1.j; j <= xy2.j; j++) {
            timeTable.value[i][j].checked = check
        }
    }
    for (let i = 0; i < timeTable.value.length; i++) {
        for (let j = 0; j < timeTable.value[i].length; j++) {
            timeTable.value[i][j].highlight = false
        }
    }
    timeTableToModelValue()
    selectStartPos.value = null
    // highlightOperation();
}

const highlightOperation = (xy1param: any = null, xy2param: any = null) => {
    let xy1 = null,
        xy2 = null
    if (xy1param && xy2param) {
        xy1 = {
            i: Math.min(xy1param.i, xy2param.i),
            j: Math.min(xy1param.j, xy2param.j)
        }
        xy2 = {
            i: Math.max(xy1param.i, xy2param.i),
            j: Math.max(xy1param.j, xy2param.j)
        }
    }
    for (let i = 0; i < timeTable.value.length; i++) {
        for (let j = 0; j < timeTable.value[i].length; j++) {
            if (xy1 && xy2 && i >= xy1.i && i <= xy2.i && j >= xy1.j && j <= xy2.j) {
                timeTable.value[i][j].highlight = true
            } else {
                timeTable.value[i][j].highlight = false
            }
        }
    }
}

type CordType = {
    clientX: number,
    clientY: number,
}
var lastTouch: CordType = {
    clientX: 0,
    clientY: 0
};
const getTouchMouseTargetElement = (e: any) => {
    if(e.touches) {
        let cords: CordType = lastTouch;
        if(e.touches[0] && typeof e.touches[0].clientX !== "undefined" && typeof e.touches[0].clientY !== "undefined"){
            cords = {
                clientX: e.touches[0].clientX, 
                clientY: e.touches[0].clientY
            }
            lastTouch = cords
        }
        return document.elementFromPoint(cords.clientX, cords.clientY);
    }
    return e.target;
}


let closeAction = false;
const mouseDownHandler = (event: any) => {
    event.preventDefault()
    if(props.disabled){
        return;
    }
    console.log(event)
    if(event.which && event.which != 1){
        return;
    }
    let block = getTouchMouseTargetElement(event); //event.target
    if (block && block.closest('.clear-icon')) {
        closeAction = true;
        return;
    }
    if (block && block.closest('.hour-block-cell')) {
        if (selectStartPos.value) {
            mouseUpHandler(event)
        } else {
            highlightOperation()
            let pos = { i: 0, j: 0 }
            pos.i = _parseInt(block.getAttribute('data-pos-i'))
            pos.j = _parseInt(block.getAttribute('data-pos-j'))
            selectStartPos.value = pos
        }
    }
}

const mouseUpHandler = (event: any) => {
    event.preventDefault()
    if(props.disabled){
        return;
    }
    console.log(event)
    let block = getTouchMouseTargetElement(event); //event.target
    if (closeAction && block && block.closest('.clear-icon')) {
        clearTable();
        return;
    }

    if (block && selectStartPos.value && block.closest('.hour-block-cell')) {
        let pos = { i: 0, j: 0 }
        pos.i = _parseInt(block.getAttribute('data-pos-i'))
        pos.j = _parseInt(block.getAttribute('data-pos-j'))
        checkOperation(selectStartPos.value, pos)
    } else {
        selectStartPos.value = null
        highlightOperation()
    }
}

const mouseMoveHandler = (event: any) => {
    if(props.disabled){
        return;
    }
    event.preventDefault()
    let block = getTouchMouseTargetElement(event); //event.target
    if (block && selectStartPos.value && block.closest('.hour-block-cell')) {
        let pos = { i: 0, j: 0 }
        pos.i = _parseInt(block.getAttribute('data-pos-i'))
        pos.j = _parseInt(block.getAttribute('data-pos-j'))
        highlightOperation(selectStartPos.value, pos)
    }
}

</script>

<style scoped lang="scss">
*{
    box-sizing: border-box;
}
.hour-range-picker {
    user-select: none;
    & > table {
        table-layout: fixed;
        vertical-align: middle;
        width: 100%;
        border-spacing: 0px;
        border-collapse: separate;
        font-size: 100%;

        $borderWidth: 2px;
        $borderRadius: 0.375rem;
        th,
        td {
            width: 4%;
            padding: 0;
            border-color: #eee;
            border-style: solid;
            border-width: 0;
            border-top-width: $borderWidth;
            border-right-width: $borderWidth;
            text-align: center;
            font-weight: bold;
            color: #444;
            // box-shadow: 0px 0px 3px rgba(0,0,0,.2) inset;
        }
        th:first-child,
        td:first-child {
            border-left-width: $borderWidth;
        }
        tr:last-child th,
        tr:last-child td {
            border-bottom-width: $borderWidth;
        }
        .hour-block-cell {
            cursor: pointer;
            .hour-block {
                display: block;
                width: 100%;
                position: relative;
                padding-top: 100%;
                background-color: rgb(12, 176, 188);
                opacity: 0;
                transition: 0.1s ease-in;
            }
            &:hover {
                .hour-block {
                    opacity: 0.3;
                }
            }
            &.hour-block-checked {
                .hour-block {
                    opacity: 1;
                }
                // box-shadow: 0px 0px 3px rgba(0,0,0,.5) inset;
            }
            &.hour-block-hightlight {
                .hour-block {
                    opacity: 0.3;
                }
            }
        }

        .hour-name {
            position: relative;
            display: block;
            width: 100%;
            padding-top: 100%;
            .hour-name-child {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translateX(-50%) translateY(-50%);
            }
            &.hour-muted {
                color: #999;
            }
        }
        .day-name {
            position: relative;
            display: block;
            width: 100%;
            padding-top: 100%;
            font-size: 90%;
            .day-name-child {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translateX(-50%) translateY(-50%);
            }
            &.day-muted {
                color: #999;
            }
        }
        .clear-icon-cell{
            position: relative;
            .clear-icon {
                opacity: 0.4;
                cursor: pointer;
                transition: 0.1s ease-in;
                &:hover {
                    opacity: 1;
                }
                position: absolute;
                top:0;
                left:0;
                width: 100%;
                height: 100%;
                .svg-icon{
                    position: absolute;
                    width: 100%;
                    max-width: 50px;
                    max-height: 50px;
                    top:50%;
                    left: 50%;
                    transform: translateX(-50%) translateY(-50%);
                }
            }
        }
        tbody {
            tr:first-child td:first-child {
                border-top-left-radius: $borderRadius;
            }
            tr:first-child td:last-child {
                border-top-right-radius: $borderRadius;
            }
            tr:last-child td:first-child {
                border-bottom-left-radius: $borderRadius;
            }
            tr:last-child td:last-child {
                border-bottom-right-radius: $borderRadius;
            }
            .hour-block[data-pos-i='6'][data-pos-j='23'] {
                border-bottom-right-radius: $borderRadius;
            }
        }
    }
}
</style>