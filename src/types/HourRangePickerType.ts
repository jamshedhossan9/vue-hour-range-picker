type DayType = {
    key: string,
    name: string,
}

type WeekType = DayType[]

type HourRangePickerType = {
    [key: string]: {
        [key: string]: boolean
    }
}

export type { DayType, WeekType, HourRangePickerType }