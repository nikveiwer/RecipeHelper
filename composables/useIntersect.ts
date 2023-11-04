import { type Ref } from "vue";

export const useInersect = <T extends HTMLElement>(
    root: Ref<T | null>,
    observable: Ref<T | null>[],
    toDo: (
        entry: IntersectionObserverEntry,
        observer: IntersectionObserver
    ) => void,
    rootMargin?: string,
    threshold?: number | number[]
) => {
    const callback: IntersectionObserverCallback = (entries, observer) => {
        entries.forEach((entry) => {
            toDo(entry, observer);
        });
    };

    let observer: IntersectionObserver | null = null;

    watch(
        () => root.value,
        () => {
            console.log(root);
            console.log(observable);

            if (root.value) {
                const options: IntersectionObserverInit = {
                    root: toValue(root),
                    rootMargin,
                    threshold,
                };

                observer = new IntersectionObserver(callback, options);

                observable.forEach((item) => {
                    if (item.value !== null) {
                        observer?.observe(toValue(item as unknown as Ref<T>));
                    }
                });
            }
        }
    );

    onUnmounted(() => observer?.disconnect());
};
