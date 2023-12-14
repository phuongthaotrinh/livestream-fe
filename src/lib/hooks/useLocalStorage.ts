// import { useState } from 'react';
//
// const useLocalStorage = <T>(key: string, initialValue: T) => {
//     const storedValue = localStorage.getItem(key)!;
//     const initial = storedValue ? JSON.parse(storedValue) : initialValue;
//
//     const [value, setValue] = useState<T>(initial);
//
//     const setStoredValue = (newValue: T) => {
//         setValue(newValue);
//         localStorage.setItem(key, JSON.stringify(newValue));
//     };
//
//     return [value, setStoredValue] as const;
// };
//
// export default useLocalStorage;

import { useState, useEffect, Dispatch, SetStateAction } from 'react';

type SetValue<T> = Dispatch<SetStateAction<T>>;

function UseLocalStorage<T>(
    key: string,
    initialValue: T
): [T, SetValue<T>] {
    // Lấy giá trị từ Local Storage khi component được mount
    const storedValue = typeof window !== 'undefined' ? localStorage.getItem(key) : null;
    const initial = storedValue ? JSON.parse(storedValue) : initialValue;

    // State để theo dõi giá trị
    const [value, setValue] = useState<T>(initial);

    // Lưu giá trị vào Local Storage mỗi khi giá trị thay đổi
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(key, JSON.stringify(value));
        }
    }, [key, value]);

    return [value, setValue];
}

export default UseLocalStorage;
