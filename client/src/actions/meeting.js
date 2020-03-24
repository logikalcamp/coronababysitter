export const setStep = (val) => ({
    type:"SET_TYPE",
    val
})

export const setMeeting = (val) => ({
    type:"SET_MEETINGS",
    val
})

export const setEvents = (val,user) => ({
    type:"SET_EVENTS",
    val,
    user
})

export const mergeMeetings = (events) => ({
    type:"MERGE_MEETINGS",
    events
})

export const saveme = (thi) => ({
    type:"SAVE_ONGO",
    thi
})