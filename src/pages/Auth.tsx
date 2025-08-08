import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, Phone, Shield } from 'lucide-react';

const Auth = () => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone: phone,
        options: {
          shouldCreateUser: true,
        }
      });

      if (error) throw error;

      toast({
        title: "OTP Sent!",
        description: "Please check your phone for the verification code.",
      });
      setStep('otp');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.verifyOtp({
        phone: phone,
        token: otp,
        type: 'sms'
      });

      if (error) throw error;

      toast({
        title: "Welcome!",
        description: "You have successfully signed in.",
      });
      navigate('/');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-peaceful flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-healing border-0">
          <CardHeader className="text-center pb-2">
            <div className="flex items-center justify-center mb-4">
              {step === 'otp' && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setStep('phone')}
                  className="absolute left-4 top-4"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              )}
              <div className="bg-gradient-healing p-3 rounded-full">
                {step === 'phone' ? (
                  <Phone className="h-6 w-6 text-primary-foreground" />
                ) : (
                  <Shield className="h-6 w-6 text-primary-foreground" />
                )}
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-foreground">
              {step === 'phone' ? 'Start Your Healing Journey' : 'Verify Your Phone'}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {step === 'phone' 
                ? 'Enter your phone number to begin'
                : 'Enter the verification code sent to your phone'
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {step === 'phone' ? (
              <form onSubmit={handleSendOTP} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="h-12 text-base"
                  />
                  <p className="text-xs text-muted-foreground">
                    Include country code (e.g., +1 for US)
                  </p>
                </div>
                <Button 
                  type="submit" 
                  className="w-full h-12 bg-gradient-healing hover:opacity-90 text-lg font-medium"
                  disabled={loading || !phone}
                >
                  {loading ? 'Sending...' : 'Send Verification Code'}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOTP} className="space-y-6">
                <div className="space-y-4">
                  <Label className="text-sm font-medium text-center block">
                    Verification Code
                  </Label>
                  <div className="flex justify-center">
                    <InputOTP
                      maxLength={6}
                      value={otp}
                      onChange={(value) => setOtp(value)}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  <p className="text-xs text-center text-muted-foreground">
                    Code sent to {phone}
                  </p>
                </div>
                <div className="space-y-3">
                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-gradient-healing hover:opacity-90 text-lg font-medium"
                    disabled={loading || otp.length !== 6}
                  >
                    {loading ? 'Verifying...' : 'Verify & Continue'}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleSendOTP}
                    disabled={loading}
                    className="w-full text-muted-foreground hover:text-foreground"
                  >
                    Resend Code
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;