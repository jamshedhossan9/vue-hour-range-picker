

<template>
    <div class="container">
        <h3 class="page-title">Vue Weekly Hour Range Picker</h3>
        <div class="hour-range-picker-test">
            <VueWeeklyHourGrid class="w-full" v-model="dayParting" 
            blockColor="#f5f2a6" 
            borderColor="#a61f90" 
            labelColor="green" 
            labelMutedColor="red" 
            borderWidth="4px"
            rounded=".5rem"
            clear-icon-color="blue"
            :disabled="false"
            :add-note="false" @update:modelValue="updated"></VueWeeklyHourGrid>
        </div>
    </div>
    
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import VueWeeklyHourGrid from '../src/components/VueWeeklyHourGrid.vue'
    import type { HourRangePickerType } from '../src/types/HourRangePickerType'

    const dayParting = ref<HourRangePickerType>();
    dayParting.value = {
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
    const updated = () => {
        // console.log(dayParting.value)
    }
</script>

<style lang="scss">
    *{
        box-sizing: border-box;
    }
    body, html{
        padding: 0;
        margin: 0;
        background: #ffffff;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; /* (e.g., Courier) */
        font-size: 1rem;
    }
    .container{
        margin: 0 auto;
        width: 100%;
        max-width: 1200px;
        padding: 20px;
    }
</style>

<style lang="scss" scoped>
.page-title{
    font-size: 200%;
}
.hour-range-picker-test{

}
</style>