export const categories = [
    {
        title: "All",
        value: "all",
    },
    {
        title: "Food",
        value: "food",
    },
    {
        title: "Drink",
        value: "drink",
    },
] as const;

export type CategoryValue = (typeof categories)[number]["value"];
