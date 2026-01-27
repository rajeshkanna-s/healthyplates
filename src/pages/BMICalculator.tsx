import { useState } from "react";
import { Calculator, Scale, Ruler, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface BMIResult {
  bmi: number;
  category: string;
  color: string;
  description: string;
}

function calculateBmi(weight: number, height: number): BMIResult {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  
  let category: string;
  let color: string;
  let description: string;
  
  if (bmi < 18.5) {
    category = "Underweight";
    color = "hsl(200, 80%, 50%)";
    description = "You may need to gain some weight. Consult a healthcare provider.";
  } else if (bmi >= 18.5 && bmi < 25) {
    category = "Normal";
    color = "hsl(142, 76%, 36%)";
    description = "Great! You have a healthy weight. Keep maintaining it.";
  } else if (bmi >= 25 && bmi < 30) {
    category = "Overweight";
    color = "hsl(38, 92%, 50%)";
    description = "You may need to lose some weight through diet and exercise.";
  } else {
    category = "Obese";
    color = "hsl(0, 84%, 60%)";
    description = "Consider consulting a healthcare provider for weight management.";
  }
  
  return { bmi, category, color, description };
}

export default function BMICalculator() {
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lb'>('kg');
  const [heightUnit, setHeightUnit] = useState<'cm' | 'ft'>('cm');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [feet, setFeet] = useState('');
  const [inches, setInches] = useState('');
  const [result, setResult] = useState<BMIResult | null>(null);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    setError('');
    setResult(null);

    let weightNum: number;
    let heightNum: number;

    if (weightUnit === 'kg') {
      weightNum = parseFloat(weight);
    } else {
      weightNum = parseFloat(weight) * 0.453592;
    }

    if (heightUnit === 'cm') {
      heightNum = parseFloat(height);
    } else {
      const feetNum = parseFloat(feet) || 0;
      const inchesNum = parseFloat(inches) || 0;
      heightNum = (feetNum * 30.48) + (inchesNum * 2.54);
    }

    if (isNaN(weightNum) || weightNum <= 0) {
      setError('Please enter a valid weight');
      return;
    }
    if (isNaN(heightNum) || heightNum <= 0) {
      setError('Please enter a valid height');
      return;
    }
    if (weightNum > 500) {
      setError('Weight seems too high. Please check your input.');
      return;
    }
    if (heightNum > 300 || heightNum < 50) {
      setError('Height seems invalid. Please check your input.');
      return;
    }

    const bmiResult = calculateBmi(weightNum, heightNum);
    setResult(bmiResult);
  };

  const handleReset = () => {
    setWeight('');
    setHeight('');
    setFeet('');
    setInches('');
    setResult(null);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
            BMI Calculator
          </h1>
          <p className="text-xl text-muted-foreground">Calculate your Body Mass Index to understand your weight category</p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Header Card */}
          <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border-blue-200 dark:border-blue-800 mb-8">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-blue-500 text-white">
                  <Calculator className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-200">Free BMI Calculator</h2>
                  <p className="text-blue-600 dark:text-blue-400">
                    Supports both metric (kg/cm) and imperial (lb/ft) units
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Calculator Card */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-primary" />
                Enter Your Measurements
              </CardTitle>
              <CardDescription>
                Enter your weight and height to calculate your BMI
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Weight Input */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium flex items-center gap-2">
                    <Scale className="w-4 h-4" />
                    Weight
                  </Label>
                  <div className="flex gap-2">
                    <Button
                      variant={weightUnit === 'kg' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setWeightUnit('kg')}
                    >
                      kg
                    </Button>
                    <Button
                      variant={weightUnit === 'lb' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setWeightUnit('lb')}
                    >
                      lb
                    </Button>
                  </div>
                </div>
                <Input
                  type="number"
                  placeholder={`Enter weight in ${weightUnit}`}
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="text-lg"
                  min="0"
                  max="500"
                />
              </div>

              {/* Height Input */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium flex items-center gap-2">
                    <Ruler className="w-4 h-4" />
                    Height
                  </Label>
                  <div className="flex gap-2">
                    <Button
                      variant={heightUnit === 'cm' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setHeightUnit('cm')}
                    >
                      cm
                    </Button>
                    <Button
                      variant={heightUnit === 'ft' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setHeightUnit('ft')}
                    >
                      ft/in
                    </Button>
                  </div>
                </div>
                {heightUnit === 'cm' ? (
                  <Input
                    type="number"
                    placeholder="Enter height in cm"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="text-lg"
                    min="0"
                    max="300"
                  />
                ) : (
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <Input
                        type="number"
                        placeholder="Feet"
                        value={feet}
                        onChange={(e) => setFeet(e.target.value)}
                        className="text-lg"
                        min="0"
                        max="8"
                      />
                    </div>
                    <div className="flex-1">
                      <Input
                        type="number"
                        placeholder="Inches"
                        value={inches}
                        onChange={(e) => setInches(e.target.value)}
                        className="text-lg"
                        min="0"
                        max="11"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
                  {error}
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-3">
                <Button onClick={handleCalculate} className="flex-1" size="lg">
                  <Calculator className="w-4 h-4 mr-2" />
                  Calculate BMI
                </Button>
                <Button onClick={handleReset} variant="outline" size="lg">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Result Card */}
          {result && (
            <Card className="mt-8 animate-fade-in shadow-lg overflow-hidden">
              <CardHeader className="pb-4">
                <CardTitle className="text-center text-xl">Your BMI Result</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* BMI Circle Display */}
                <div className="flex flex-col items-center">
                  <div 
                    className="w-32 h-32 rounded-full flex flex-col items-center justify-center shadow-lg"
                    style={{ backgroundColor: result.color }}
                  >
                    <span className="text-3xl font-bold text-white">{result.bmi.toFixed(1)}</span>
                    <span className="text-sm text-white/90">BMI</span>
                  </div>
                  <div className="mt-4 text-center">
                    <span 
                      className="text-2xl font-bold"
                      style={{ color: result.color }}
                    >
                      {result.category}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div className="p-4 rounded-lg bg-muted/50 text-center">
                  <p className="text-muted-foreground">{result.description}</p>
                </div>

                {/* BMI Scale */}
                <div className="space-y-3">
                  <p className="text-sm font-medium text-center">BMI Categories</p>
                  <div className="flex gap-1 h-3 rounded-full overflow-hidden">
                    <div className="flex-1 bg-blue-400" title="Underweight" />
                    <div className="flex-1 bg-green-500" title="Normal" />
                    <div className="flex-1 bg-orange-400" title="Overweight" />
                    <div className="flex-1 bg-red-500" title="Obese" />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>&lt;18.5</span>
                    <span>18.5-24.9</span>
                    <span>25-29.9</span>
                    <span>&gt;30</span>
                  </div>
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-blue-500">Underweight</span>
                    <span className="text-green-600">Normal</span>
                    <span className="text-orange-500">Overweight</span>
                    <span className="text-red-500">Obese</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Info Card */}
          <Card className="mt-8 border-muted">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">What is BMI?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                <strong>Body Mass Index (BMI)</strong> is a simple measurement using your height and weight to work out if your weight is healthy.
              </p>
              <p>
                The BMI calculation divides your weight (in kilograms) by your height (in meters) squared.
              </p>
              <p className="text-xs italic">
                Note: BMI is a general indicator and doesn't account for muscle mass, bone density, age, or gender. Always consult a healthcare provider for personalized advice.
              </p>
            </CardContent>
          </Card>

          {/* Educational Disclaimer */}
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
              <strong>Educational Disclaimer:</strong> This calculator is for informational purposes only. 
              Always consult healthcare professionals for medical advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
