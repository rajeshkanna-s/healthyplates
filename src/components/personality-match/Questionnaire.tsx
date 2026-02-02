import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { ChevronLeft, ChevronRight, SkipForward, CheckCircle, AlertCircle } from 'lucide-react';
import { personalityQuestions, categoryLabels, getMandatoryQuestions, getOptionalQuestions } from './questionsData';
import { Question } from './types';

interface QuestionnaireProps {
  gender: 'male' | 'female';
  onComplete: (answers: Record<string, number>) => void;
  onBack: () => void;
}

const Questionnaire: React.FC<QuestionnaireProps> = ({ gender, onComplete, onBack }) => {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showOptional, setShowOptional] = useState(false);

  const mandatoryQuestions = useMemo(() => getMandatoryQuestions(), []);
  const optionalQuestions = useMemo(() => getOptionalQuestions(), []);
  
  const currentQuestions = showOptional ? optionalQuestions : mandatoryQuestions;
  const currentQuestion = currentQuestions[currentIndex];
  
  const totalMandatory = mandatoryQuestions.length;
  const answeredMandatory = mandatoryQuestions.filter(q => answers[q.id] !== undefined).length;
  const allMandatoryAnswered = answeredMandatory === totalMandatory;
  
  const totalQuestions = personalityQuestions.length;
  const totalAnswered = Object.keys(answers).length;
  const progress = (totalAnswered / totalQuestions) * 100;

  const getQuestionText = (question: Question): string => {
    if (gender === 'male' && question.textMale) return question.textMale;
    if (gender === 'female' && question.textFemale) return question.textFemale;
    return question.text;
  };

  const handleAnswer = (value: number) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
  };

  const goNext = () => {
    if (currentIndex < currentQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else if (!showOptional) {
      // Finished mandatory, ask about optional
      setShowOptional(true);
      setCurrentIndex(0);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else if (showOptional) {
      setShowOptional(false);
      setCurrentIndex(mandatoryQuestions.length - 1);
    }
  };

  const skipOptional = () => {
    if (currentIndex < optionalQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleComplete = () => {
    onComplete(answers);
  };

  const currentAnswer = answers[currentQuestion?.id];
  const isLastQuestion = showOptional && currentIndex === optionalQuestions.length - 1;
  const canGoNext = currentAnswer !== undefined || (showOptional && !currentQuestion.isMandatory);

  const scaleLabels = [
    'Strongly Disagree',
    'Disagree',
    'Neutral',
    'Agree',
    'Strongly Agree',
  ];

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Progress Header */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardContent className="py-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Badge variant={showOptional ? 'secondary' : 'default'} className="bg-green-700">
                {showOptional ? 'Optional Questions' : 'Mandatory Questions'}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {currentIndex + 1} of {currentQuestions.length}
              </span>
            </div>
            <span className="text-sm font-medium">
              {totalAnswered}/{totalQuestions} answered
            </span>
          </div>
          <Progress value={progress} className="h-2" />
          
          {!showOptional && (
            <div className="flex items-center gap-2 mt-2 text-sm">
              {allMandatoryAnswered ? (
                <>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-green-700">All mandatory questions complete!</span>
                </>
              ) : (
                <>
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                  <span className="text-amber-700">
                    {totalMandatory - answeredMandatory} mandatory questions remaining
                  </span>
                </>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Question Card */}
      {currentQuestion && (
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">{categoryLabels[currentQuestion.category]}</Badge>
              {currentQuestion.isMandatory && (
                <Badge variant="destructive" className="text-xs">Required</Badge>
              )}
            </div>
            <CardTitle className="text-xl leading-relaxed">
              {getQuestionText(currentQuestion)}
            </CardTitle>
            <CardDescription>
              Rate how much you agree with this statement
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="px-4">
              <Slider
                value={[currentAnswer || 3]}
                onValueChange={([value]) => handleAnswer(value)}
                min={1}
                max={5}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between mt-4 text-xs text-muted-foreground">
                {scaleLabels.map((label, index) => (
                  <span 
                    key={label} 
                    className={`text-center flex-1 ${currentAnswer === index + 1 ? 'text-primary font-semibold' : ''}`}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Select Buttons */}
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <Button
                  key={value}
                  variant={currentAnswer === value ? 'default' : 'outline'}
                  className={`w-12 h-12 rounded-full ${currentAnswer === value ? 'bg-green-700 hover:bg-green-800' : ''}`}
                  onClick={() => handleAnswer(value)}
                >
                  {value}
                </Button>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={currentIndex === 0 && !showOptional ? onBack : goPrev}
              className="gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              {currentIndex === 0 && !showOptional ? 'Edit Profile' : 'Previous'}
            </Button>

            <div className="flex gap-2">
              {showOptional && !currentQuestion.isMandatory && !isLastQuestion && (
                <Button
                  variant="ghost"
                  onClick={skipOptional}
                  className="gap-2"
                >
                  <SkipForward className="h-4 w-4" />
                  Skip
                </Button>
              )}

              {isLastQuestion || (!showOptional && allMandatoryAnswered && currentIndex === mandatoryQuestions.length - 1) ? (
                <div className="flex gap-2">
                  {!showOptional && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowOptional(true);
                        setCurrentIndex(0);
                      }}
                      className="gap-2"
                    >
                      Answer Optional Questions
                    </Button>
                  )}
                  <Button
                    onClick={handleComplete}
                    disabled={!allMandatoryAnswered}
                    className="gap-2 bg-green-700 hover:bg-green-800"
                  >
                    <CheckCircle className="h-4 w-4" />
                    Complete Assessment
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={goNext}
                  disabled={!canGoNext}
                  className="gap-2 bg-green-700 hover:bg-green-800"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
      )}

      {/* Optional Section Info */}
      {showOptional && currentIndex === 0 && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="py-4">
            <p className="text-sm text-blue-700">
              <strong>Optional Questions:</strong> These additional questions help create a more detailed personality analysis. 
              You can skip any question or finish at any time by clicking "Complete Assessment".
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Questionnaire;
