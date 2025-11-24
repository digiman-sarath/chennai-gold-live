import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, Scale } from 'lucide-react';

interface GoldCalculatorProps {
  price22k: number;
  price24k: number;
}

const GoldCalculator = ({ price22k, price24k }: GoldCalculatorProps) => {
  const [weight, setWeight] = useState<string>('10');
  const [unit, setUnit] = useState<'grams' | 'tolas' | 'sovereigns'>('grams');
  const [purity, setPurity] = useState<'22k' | '24k' | '18k'>('22k');
  const [makingCharges, setMakingCharges] = useState<string>('10');

  // Conversion constants
  const TOLA_TO_GRAMS = 11.6638038;
  const SOVEREIGN_TO_GRAMS = 8;

  // Calculate 18K price from 24K
  const price18k = Math.round(price24k * 0.75);

  const convertToGrams = (value: number, fromUnit: string): number => {
    switch (fromUnit) {
      case 'tolas':
        return value * TOLA_TO_GRAMS;
      case 'sovereigns':
        return value * SOVEREIGN_TO_GRAMS;
      default:
        return value;
    }
  };

  const convertFromGrams = (grams: number, toUnit: string): number => {
    switch (toUnit) {
      case 'tolas':
        return grams / TOLA_TO_GRAMS;
      case 'sovereigns':
        return grams / SOVEREIGN_TO_GRAMS;
      default:
        return grams;
    }
  };

  const weightInGrams = convertToGrams(parseFloat(weight) || 0, unit);
  const weightInTolas = convertFromGrams(weightInGrams, 'tolas');
  const weightInSovereigns = convertFromGrams(weightInGrams, 'sovereigns');

  const pricePerGram = purity === '22k' ? price22k : purity === '24k' ? price24k : price18k;
  const goldValue = weightInGrams * pricePerGram;
  const makingChargesAmount = (goldValue * (parseFloat(makingCharges) || 0)) / 100;
  const totalPrice = goldValue + makingChargesAmount;

  return (
    <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          Gold Price Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Input Section */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="weight">Weight</Label>
            <Input
              id="weight"
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter weight"
              min="0"
              step="0.01"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="unit">Unit</Label>
            <Select value={unit} onValueChange={(value: any) => setUnit(value)}>
              <SelectTrigger id="unit">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="grams">Grams</SelectItem>
                <SelectItem value="tolas">Tolas</SelectItem>
                <SelectItem value="sovereigns">Sovereigns</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="purity">Gold Purity</Label>
            <Select value={purity} onValueChange={(value: any) => setPurity(value)}>
              <SelectTrigger id="purity">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24k">24K (99.9%)</SelectItem>
                <SelectItem value="22k">22K (91.6%)</SelectItem>
                <SelectItem value="18k">18K (75%)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="making">Making Charges (%)</Label>
          <Input
            id="making"
            type="number"
            value={makingCharges}
            onChange={(e) => setMakingCharges(e.target.value)}
            placeholder="Enter making charges %"
            min="0"
            step="0.1"
          />
        </div>

        {/* Conversion Display */}
        <div className="bg-muted/30 rounded-lg p-4 space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <Scale className="h-4 w-4 text-primary" />
            <h4 className="font-semibold text-foreground">Weight Conversions</h4>
          </div>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Grams</p>
              <p className="font-semibold text-foreground">{weightInGrams.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Tolas</p>
              <p className="font-semibold text-foreground">{weightInTolas.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Sovereigns</p>
              <p className="font-semibold text-foreground">{weightInSovereigns.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-4 space-y-3 border border-primary/20">
          <h4 className="font-semibold text-foreground mb-3">Price Breakdown</h4>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Gold Rate ({purity.toUpperCase()})</span>
              <span className="font-medium text-foreground">₹{pricePerGram.toLocaleString('en-IN')}/gram</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">Gold Value</span>
              <span className="font-medium text-foreground">₹{goldValue.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">Making Charges ({makingCharges}%)</span>
              <span className="font-medium text-foreground">₹{makingChargesAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
            </div>
            
            <div className="border-t border-border pt-2 mt-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-foreground">Total Price</span>
                <span className="text-2xl font-bold text-primary">₹{totalPrice.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          * Making charges vary by jeweler. Final price may differ based on design complexity and jeweler policies.
        </p>
      </CardContent>
    </Card>
  );
};

export default GoldCalculator;
