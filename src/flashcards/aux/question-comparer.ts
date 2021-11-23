import { IQuestionComparer } from '@src/flashcards/ports';

export class QuestionComparer implements IQuestionComparer {
    isEqual(question1: string, question2: string): boolean {
        return this.normalize(question1) === this.normalize(question2);
    }

    private normalize(value: string) {
        return value
            .toLocaleLowerCase()
            .replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~\s]/g, '');
    }
}
