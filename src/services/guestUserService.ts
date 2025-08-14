import { supabase } from '@/integrations/supabase/client';

export interface GuestUserProfile {
  id?: string;
  email?: string;
  age?: number;
  gender?: string;
  occupation?: string;
  location?: string;
  user_id?: string; // Optional for guest users
  guest_id?: string; // For guest users
  created_at?: string;
  updated_at?: string;
}

export interface GuestAssessment {
  id?: string;
  user_id?: string; // Optional for guest users
  guest_id?: string; // For guest users
  status: 'not_started' | 'in_progress' | 'completed';
  total_questions: number;
  current_index: number;
  started_at?: string;
  completed_at?: string;
  created_at?: string;
  updated_at?: string;
}

export interface GuestResponse {
  id?: string;
  assessment_id: string; // Changed from user_id to assessment_id to match HS_responses table
  question_id: string;
  option_id: string;
  created_at?: string;
}

class GuestUserService {
  private getGuestId(): string {
    let guestId = localStorage.getItem('guest_id');
    if (!guestId || !this.isValidUUID(guestId)) {
      // Generate a proper UUID for Supabase compatibility
      if (guestId) {
        console.log('Existing guest_id is not a valid UUID, regenerating:', guestId);
      }
      guestId = this.generateUUID();
      console.log('Generated new UUID for guest:', guestId);
      localStorage.setItem('guest_id', guestId);
    } else {
      console.log('Using existing valid UUID:', guestId);
    }
    return guestId;
  }

  private isValidUUID(uuid: string): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
  }

  private generateUUID(): string {
    // Generate a valid UUID v4
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  async createOrUpdateProfile(profile: Omit<GuestUserProfile, 'id' | 'user_id' | 'guest_id' | 'created_at' | 'updated_at'>): Promise<GuestUserProfile> {
    const guestId = this.getGuestId();
    
    try {
      // Store in localStorage as backup
      const profileData = {
        ...profile,
        user_id: null, // Set to null for guest users
        guest_id: guestId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      localStorage.setItem('guest_profile', JSON.stringify(profileData));
      
      // Try to create/update profile in Supabase
      try {
        const { data, error } = await supabase
          .from('HS_user_profiles')
          .upsert({
            user_id: null, // Set to null for guest users
            guest_id: guestId, // Use guest_id instead
            email: profile.email,
            age: profile.age,
            gender: profile.gender,
            occupation: profile.occupation,
            location: profile.location,
            created_at: profileData.created_at,
            updated_at: profileData.updated_at
          }, {
            onConflict: 'guest_id' // Use guest_id for conflict resolution
          });
        
        if (error) {
          console.warn('Supabase profile operation failed, using localStorage:', error);
        } else {
          console.log('Profile saved to Supabase successfully');
        }
      } catch (supabaseError) {
        console.warn('Supabase error, falling back to localStorage:', supabaseError);
      }
      
      return profileData as GuestUserProfile;
    } catch (error) {
      console.error('Error creating/updating profile:', error);
      throw error;
    }
  }

  async getProfile(): Promise<GuestUserProfile | null> {
    const guestId = this.getGuestId();
    
    try {
      // First try localStorage
      const localProfile = localStorage.getItem('guest_profile');
      if (localProfile) {
        return JSON.parse(localProfile);
      }
      
      // Try to get profile from Supabase
      try {
        const { data, error } = await supabase
          .from('HS_user_profiles')
          .select('*')
          .eq('guest_id', guestId) // Use guest_id instead of user_id
          .single();
        
        if (error) {
          console.warn('Supabase profile fetch failed:', error);
        } else if (data) {
          // Store in localStorage for future use
          const profileData = { ...data, guest_id: guestId };
          localStorage.setItem('guest_profile', JSON.stringify(profileData));
          return profileData as GuestUserProfile;
        }
      } catch (supabaseError) {
        console.warn('Supabase error, using localStorage only:', supabaseError);
      }
      
      return null;
    } catch (error) {
      console.error('Error getting profile:', error);
      return null;
    }
  }

  async createAssessment(): Promise<GuestAssessment> {
    const guestId = this.getGuestId();
    
    try {
      console.log('Creating assessment for guest:', guestId);
      
      // Store in localStorage as backup
      const assessmentData: GuestAssessment = {
        user_id: null, // Set to null for guest users
        guest_id: guestId, // Use guest_id instead
        status: 'not_started' as const,
        total_questions: 23,
        current_index: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      localStorage.setItem('guest_assessment', JSON.stringify(assessmentData));
      console.log('Assessment saved to localStorage:', assessmentData);
      
      // Try to create assessment in Supabase
      try {
        console.log('Attempting to create assessment in Supabase...');
        const { data, error } = await supabase
          .from('HS_assessments')
          .insert({
            user_id: null, // Set to null for guest users
            guest_id: guestId, // Use guest_id instead
            status: 'not_started',
            total_questions: 23,
            current_index: 0,
            created_at: assessmentData.created_at,
            updated_at: assessmentData.updated_at
          })
          .select()
          .single();
        
        if (error) {
          console.warn('Supabase assessment creation failed, using localStorage:', error);
          console.warn('Error details:', error.message, error.details, error.hint);
        } else if (data) {
          // Update localStorage with the Supabase ID
          assessmentData.id = data.id;
          localStorage.setItem('guest_assessment', JSON.stringify(assessmentData));
          console.log('Assessment created in Supabase successfully with ID:', data.id);
          console.log('Updated localStorage with Supabase ID:', assessmentData);
        }
      } catch (supabaseError) {
        console.warn('Supabase error, using localStorage only:', supabaseError);
      }
      
      return assessmentData as GuestAssessment;
    } catch (error) {
      console.error('Error creating assessment:', error);
      throw error;
    }
  }

  async updateAssessmentProgress(currentIndex: number, status: 'in_progress' | 'completed' = 'in_progress'): Promise<void> {
    const guestId = this.getGuestId();
    
    try {
      console.log(`Updating assessment progress: index ${currentIndex}, status ${status}, guest ${guestId}`);
      
      // Update localStorage
      const localAssessment = localStorage.getItem('guest_assessment');
      if (localAssessment) {
        const assessment = JSON.parse(localAssessment);
        assessment.current_index = currentIndex;
        assessment.status = status;
        assessment.updated_at = new Date().toISOString();
        
        if (status === 'completed') {
          assessment.completed_at = new Date().toISOString();
          console.log('Marking assessment as completed');
        } else if (status === 'in_progress' && currentIndex === 1) {
          assessment.started_at = new Date().toISOString();
          console.log('Marking assessment as started');
        }
        
        localStorage.setItem('guest_assessment', JSON.stringify(assessment));
        console.log('Updated assessment in localStorage:', assessment);
      } else {
        console.warn('No assessment found in localStorage to update');
      }
      
      // Try Supabase
      try {
        const updateData: any = {
          current_index: currentIndex,
          status,
          updated_at: new Date().toISOString()
        };

        if (status === 'completed') {
          updateData.completed_at = new Date().toISOString();
        } else if (status === 'in_progress' && currentIndex === 1) {
          updateData.started_at = new Date().toISOString();
        }

        // Get the assessment ID from localStorage
        const localAssessment = localStorage.getItem('guest_assessment');
        if (localAssessment) {
          const assessment = JSON.parse(localAssessment);
          
          if (assessment.id && !assessment.id.startsWith('local_')) {
            console.log(`Updating assessment in Supabase with ID: ${assessment.id}`);
            const { error } = await supabase
              .from('HS_assessments')
              .update(updateData)
              .eq('id', assessment.id);

            if (error) {
              console.warn('Supabase assessment update failed:', error);
              console.warn('Error details:', error.message, error.details, error.hint);
            } else {
              console.log('Assessment updated in Supabase successfully');
            }
          } else {
            console.log('No valid assessment ID found, skipping Supabase update');
          }
        }
      } catch (supabaseError) {
        console.warn('Supabase error, using localStorage only:', supabaseError);
      }
    } catch (error) {
      console.error('Error updating assessment progress:', error);
      throw error;
    }
  }

  async saveResponse(questionId: string, optionId: string): Promise<void> {
    const guestId = this.getGuestId();
    
    try {
      console.log(`Saving response for question ${questionId}, option ${optionId}, guest ${guestId}`);
      
      // Get the question order index to use as the key
      let questionOrder = 1; // Default fallback
      
      try {
        // Try to get the question order from Supabase
        const { data: questionData, error: questionError } = await supabase
          .from('HS_questions')
          .select('order_index')
          .eq('id', questionId)
          .single();
        
        if (!questionError && questionData) {
          questionOrder = questionData.order_index;
        }
      } catch (error) {
        console.warn('Could not get question order, using fallback:', error);
      }
      
      // Store in localStorage with sequential key (1, 2, 3...)
      const key = `guest_answer_${questionOrder}`;
      const responseData = {
        question_id: questionId,
        option_id: optionId,
        guest_id: guestId,
        question_order: questionOrder,
        created_at: new Date().toISOString()
      };
      localStorage.setItem(key, JSON.stringify(responseData));
      console.log(`Response saved to localStorage with key ${key}:`, responseData);
      
      // Try to save response to Supabase
      try {
        // Get the assessment ID from localStorage
        const localAssessment = localStorage.getItem('guest_assessment');
        const assessment = localAssessment ? JSON.parse(localAssessment) : null;
        
        console.log('Current assessment from localStorage:', assessment);
        
        if (assessment && assessment.id && !assessment.id.startsWith('local_')) {
          console.log(`Attempting to save response to Supabase with assessment_id: ${assessment.id}`);
          const { error } = await supabase
            .from('HS_responses')
            .insert({
              assessment_id: assessment.id,
              question_id: questionId,
              option_id: optionId,
              created_at: new Date().toISOString()
            });
          
          if (error) {
            console.warn('Supabase response save failed:', error);
            console.warn('Error details:', error.message, error.details, error.hint);
          } else {
            console.log('Response saved to Supabase successfully');
          }
        } else {
          console.log('No valid assessment ID found, skipping Supabase save');
          if (assessment) {
            console.log('Assessment details:', { id: assessment.id, user_id: assessment.user_id });
          }
        }
      } catch (supabaseError) {
        console.warn('Supabase error, using localStorage only:', supabaseError);
      }
    } catch (error) {
      console.error('Error saving response:', error);
      throw error;
    }
  }

  async getResponses(): Promise<GuestResponse[]> {
    const guestId = this.getGuestId();
    
    try {
      // Get from localStorage
      const responses: GuestResponse[] = [];
      const localAssessment = localStorage.getItem('guest_assessment');
      const assessment = localAssessment ? JSON.parse(localAssessment) : null;
      
      // Check if assessment exists and is completed
      if (!assessment || assessment.status !== 'completed') {
        console.log('No completed assessment found, returning empty responses');
        return [];
      }
      
      for (let i = 1; i <= 23; i++) {
        const key = `guest_answer_${i}`;
        const response = localStorage.getItem(key);
        if (response) {
          const parsed = JSON.parse(response);
          responses.push({
            ...parsed,
            assessment_id: assessment?.id || 'local_' + guestId // Use assessment ID if available, fallback to local identifier
          });
        }
      }
      
      console.log(`Found ${responses.length} responses for completed assessment`);
      return responses;
    } catch (error) {
      console.error('Error getting responses:', error);
      return [];
    }
  }

  async getAssessment(): Promise<GuestAssessment | null> {
    const guestId = this.getGuestId();
    
    try {
      // Get from localStorage
      const localAssessment = localStorage.getItem('guest_assessment');
      if (localAssessment) {
        return JSON.parse(localAssessment);
      }
      
      // Try to get assessment from Supabase
      try {
        const { data, error } = await supabase
          .from('HS_assessments')
          .select('*')
          .eq('guest_id', guestId) // Use guest_id instead of user_id
          .order('created_at', { ascending: false })
          .limit(1)
          .single();
        
        if (error) {
          console.warn('Supabase assessment fetch failed:', error);
        } else if (data) {
          // Store in localStorage for future use
          const assessmentData = { ...data, guest_id: guestId };
          localStorage.setItem('guest_assessment', JSON.stringify(assessmentData));
          return assessmentData as GuestAssessment;
        }
      } catch (supabaseError) {
        console.warn('Supabase error, using localStorage only:', supabaseError);
      }
      
      return null;
    } catch (error) {
      console.error('Error getting assessment:', error);
      return null;
    }
  }

  clearGuestData(): void {
    localStorage.removeItem('guest_id');
    localStorage.removeItem('guest_profile');
    localStorage.removeItem('guest_assessment');
    // Clear all guest-related data from localStorage
    for (let i = 1; i <= 23; i++) {
      localStorage.removeItem(`guest_answer_${i}`);
    }
  }

  forceRegenerateGuestId(): void {
    localStorage.removeItem('guest_id');
    // This will force a new UUID to be generated on next getGuestId() call
  }

  async getCurrentStatus(): Promise<{ supabaseReady: boolean; message: string }> {
    try {
      // Simple test query to check Supabase connectivity
      const { data, error } = await supabase
        .from('HS_questions')
        .select('id')
        .limit(1);
      
      if (error) {
        return { supabaseReady: false, message: `Supabase error: ${error.message}` };
      }
      
      return { supabaseReady: true, message: 'Supabase is ready' };
    } catch (error) {
      return { supabaseReady: false, message: `Connection error: ${error}` };
    }
  }

  async isAssessmentCompleted(): Promise<boolean> {
    try {
      const localAssessment = localStorage.getItem('guest_assessment');
      if (!localAssessment) {
        return false;
      }
      
      const assessment = JSON.parse(localAssessment);
      return assessment.status === 'completed';
    } catch (error) {
      console.error('Error checking assessment completion status:', error);
      return false;
    }
  }
}

export const guestUserService = new GuestUserService();
