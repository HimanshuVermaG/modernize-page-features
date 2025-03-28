
import { Check, X } from "lucide-react";

interface Answer {
  questionText: string;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}

interface AnswerReviewProps {
  answers: Answer[];
}

const AnswerReview = ({ answers }: AnswerReviewProps) => {
  if (!answers || answers.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 space-y-3">
      <h3 className="font-semibold">Question Review:</h3>
      {answers.map((item, index) => (
        <div key={index} className="flex items-start gap-3 bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
          {item.isCorrect ? (
            <div className="bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 p-1 rounded-full">
              <Check className="h-4 w-4" />
            </div>
          ) : (
            <div className="bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 p-1 rounded-full">
              <X className="h-4 w-4" />
            </div>
          )}
          <div className="flex-1">
            <p className="text-sm font-medium">{item.questionText}</p>
            <p className="text-xs mt-1">
              {!item.isCorrect && (
                <>
                  <span className="text-red-500 dark:text-red-400">Your answer: {item.selectedAnswer}</span>
                  <br />
                </>
              )}
              <span className={item.isCorrect ? "text-green-500 dark:text-green-400" : ""}>
                {item.isCorrect ? "Correct answer: " : "Correct answer: "}
                {item.correctAnswer}
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnswerReview;
