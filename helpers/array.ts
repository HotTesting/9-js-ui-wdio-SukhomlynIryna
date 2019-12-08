export class ArrayHelper {

    public isSorted(array):boolean {
        let isSorted = true
        for (let i = 0; i <= array.length; i++) {
            if (array[i + 1] < array[i]) {
                isSorted = false
                break
            }
        }
        return isSorted
    }
};
export const arrayHelper = new ArrayHelper()