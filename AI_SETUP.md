# AI-Powered Recommendations Setup Guide

## 🚀 **Getting Started with AI Recommendations**

### **1. OpenAI API Setup**
1. **Get an API Key**: Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. **Create API Key**: Generate a new secret key
3. **Set Environment Variable**: Create a `.env.local` file in your project root:

```bash
# .env.local
VITE_OPENAI_API_KEY=your_actual_api_key_here
```

### **2. Features Implemented**

#### **AI-Powered Recommendations**
- **Personalized Analysis**: AI analyzes assessment scores and generates custom recommendations
- **Behavioral Economics**: Incorporates loss aversion, social proof, commitment devices, and fresh start effects
- **Smart Categorization**: Recommendations are categorized by priority and difficulty level

#### **Behavioral Nudging System**
- **Micro-Habits**: Quick 1-5 minute actions (drink water, quick exercises)
- **Macro-Changes**: 15-30 minute activities (meal planning, meaningful conversations)
- **Strategic Planning**: Weekly/monthly planning activities (financial reviews, outdoor planning)

#### **Behavioral Economics Principles**
- **Loss Aversion**: Frame improvements as avoiding negative outcomes
- **Social Proof**: Show community success stories and statistics
- **Commitment Devices**: Help users make binding commitments to themselves
- **Fresh Start Effect**: Leverage natural motivation cycles (Mondays, new months)

### **3. How It Works**

1. **Assessment Completion**: User completes the wellness assessment
2. **Score Calculation**: System calculates scores across health, wealth, and relationships
3. **AI Analysis**: OpenAI GPT-4 analyzes scores and generates personalized recommendations
4. **Behavioral Nudges**: System generates contextual nudges based on score patterns
5. **Interactive Display**: Users can view, interact with, and mark nudges as completed

### **4. Customization Options**

#### **Enhance User Profiles**
```typescript
// Add more profile fields for better personalization
interface UserProfile {
  age?: number;
  occupation?: string;
  gender?: string;
  location?: string;
  personalityType?: 'introvert' | 'extrovert' | 'ambivert';
  culturalValues?: string[];
  lifestyleConstraints?: string[];
  healthGoals?: string[];
  financialGoals?: string[];
  relationshipGoals?: string[];
}
```

#### **Add More Nudge Types**
```typescript
// Extend the nudge system
interface BehavioralNudge {
  // ... existing fields
  frequency?: 'daily' | 'weekly' | 'monthly';
  reminderTime?: string;
  weatherDependent?: boolean;
  moodBased?: boolean;
}
```

### **5. Production Considerations**

#### **Security**
- **Backend API**: Move OpenAI calls to your backend server
- **Rate Limiting**: Implement API call limits per user
- **Cost Management**: Monitor and limit OpenAI API usage

#### **Performance**
- **Caching**: Cache AI recommendations for similar score patterns
- **Batch Processing**: Generate recommendations in background jobs
- **Fallback System**: Use rule-based recommendations when AI fails

#### **User Experience**
- **Progressive Enhancement**: Show basic recommendations immediately, enhance with AI
- **Loading States**: Provide feedback during AI generation
- **Error Handling**: Graceful fallback when AI services are unavailable

### **6. Alternative AI Providers**

If you prefer different AI services:

#### **Anthropic Claude**
```typescript
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});
```

#### **Local AI Models**
```typescript
// Use local models like Llama or Mistral
// Requires more infrastructure but no API costs
```

### **7. Testing the System**

1. **Complete Assessment**: Go through the full assessment flow
2. **View Results**: Check the results page with charts and scores
3. **AI Recommendations**: Look for the "Your Personalized Action Plan" section
4. **Behavioral Nudges**: Interact with the nudges and mark them as completed

### **8. Troubleshooting**

#### **Common Issues**
- **API Key Error**: Ensure `.env.local` is in project root and API key is valid
- **No Recommendations**: Check browser console for OpenAI API errors
- **Slow Loading**: AI generation can take 2-5 seconds depending on complexity

#### **Fallback Behavior**
- System automatically falls back to rule-based recommendations if AI fails
- Basic nudges are always available based on score thresholds
- No user experience disruption during AI service issues

### **9. Next Steps**

#### **Immediate Enhancements**
- [ ] Add user profile collection during assessment
- [ ] Implement nudge completion tracking
- [ ] Add progress visualization for completed nudges

#### **Advanced Features**
- [ ] Machine learning for nudge effectiveness
- [ ] Community-based recommendation sharing
- [ ] Integration with calendar and reminder systems
- [ ] A/B testing for different nudge strategies

---

**Need Help?** Check the browser console for detailed error messages and ensure your OpenAI API key is properly configured.
