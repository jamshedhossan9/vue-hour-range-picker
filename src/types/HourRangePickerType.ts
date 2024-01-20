type DayType = {
    key: string,
    name: string,
    muted: boolean
}

type WeekType = DayType[]

type HourRangePickerType = {
    [key: string]: {
        [key: string]: boolean
    }
}

export type { DayType, WeekType, HourRangePickerType }