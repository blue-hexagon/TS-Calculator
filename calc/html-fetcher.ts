export default class HTMLFetcher {
    public static getExpression(): HTMLElement {
        return document.getElementById('expression')!
    }

    public static getExpressionText(): string {
        return this.getExpression().textContent!
    }

    public static setExpression(str: string): void {
        this.getExpression().textContent = str
    }

    public static getResult(): HTMLElement {
        return document.getElementById('result')!
    }

    public static getResultText(): string {
        return this.getResult().textContent!
    }

    public static setResult(str: string): void {
        this.getResult().textContent = str
    }
}
