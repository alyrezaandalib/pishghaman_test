import { create } from 'zustand'

export const useStore = create((set) => ({
    data: [
        {id : 1, name : "ali" },
        {id : 1, name : "reza"},
        {id : 1, name : "mamad"},
    ],
}))
