export class StringUtils {
    public static StringIsNullEmptyOrWhiteSpace(value: string | null | undefined): boolean {
        return (value === null || value === undefined || value.trim() === '');
    }
}