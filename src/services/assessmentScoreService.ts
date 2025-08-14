import { supabase } from '../integrations/supabase/client';
import { Tables, TablesInsert } from '../integrations/supabase/types';

export interface AssessmentScoreData {
  assessment_id: string;
  user_id?: string | null;
  guest_id?: string | null;
  total_questions_answered: number;
  overall_total_score: number;
  overall_max_score: number;
  overall_percentage: number;
  overall_grade: string;
  overall_level: string;
  health_total_score: number;
  health_max_score: number;
  health_percentage: number;
  health_nutrition_score: number;
  health_digestion_score: number;
  health_exercise_score: number;
  health_water_score: number;
  health_sunlight_score: number;
  health_sleep_score: number;
  health_outdoor_air_score: number;
  health_oral_care_score: number;
  health_skin_care_score: number;
  wealth_total_score: number;
  wealth_max_score: number;
  wealth_percentage: number;
  wealth_quality_score: number;
  wealth_quantity_score: number;
  wealth_diversity_score: number;
  wealth_workplace_score: number;
  wealth_creativity_score: number;
  wealth_rest_relaxation_score: number;
  relationships_total_score: number;
  relationships_max_score: number;
  relationships_percentage: number;
  relationships_mental_wellbeing_score: number;
  relationships_emotional_wellbeing_score: number;
  relationships_partner_score: number;
  relationships_parents_score: number;
  relationships_children_score: number;
  relationships_relatives_score: number;
  relationships_friends_score: number;
  relationships_universal_oneness_score: number;
}

export interface ScoreBreakdown {
  health: {
    total: number;
    max: number;
    percentage: number;
    components: {
      nutrition: number;
      digestion: number;
      exercise: number;
      water: number;
      sunlight: number;
      sleep: number;
      outdoorAir: number;
      oralCare: number;
      skinCare: number;
    };
  };
  wealth: {
    total: number;
    max: number;
    percentage: number;
    components: {
      quality: number;
      quantity: number;
      diversity: number;
      workplace: number;
      creativity: number;
      restRelaxation: number;
    };
  };
  relationships: {
    total: number;
    max: number;
    percentage: number;
    components: {
      mentalWellbeing: number;
      emotionalWellbeing: number;
      partner: number;
      parents: number;
      children: number;
      relatives: number;
      friends: number;
      universalOneness: number;
    };
  };
  overall: {
    total: number;
    max: number;
    percentage: number;
    grade: string;
    level: string;
  };
}

class AssessmentScoreService {
  /**
   * Save assessment scores to the database
   */
  async saveAssessmentScores(
    assessmentId: string,
    scores: ScoreBreakdown,
    totalQuestionsAnswered: number,
    userId?: string | null,
    guestId?: string | null
  ): Promise<{ success: boolean; error?: string; scoreId?: string }> {
    try {
      console.log('💾 AssessmentScoreService: Saving assessment scores...', {
        assessmentId,
        userId,
        guestId,
        totalQuestionsAnswered,
        scores
      });

      // Validate that either user_id or guest_id is provided, but not both
      if ((userId && guestId) || (!userId && !guestId)) {
        throw new Error('Either user_id or guest_id must be provided, but not both');
      }

      const scoreData: AssessmentScoreData = {
        assessment_id: assessmentId,
        user_id: userId || null,
        guest_id: guestId || null,
        total_questions_answered: totalQuestionsAnswered,
        
        // Overall scores
        overall_total_score: scores.overall.total,
        overall_max_score: scores.overall.max,
        overall_percentage: scores.overall.percentage,
        overall_grade: scores.overall.grade,
        overall_level: scores.overall.level,
        
        // Health scores
        health_total_score: scores.health.total,
        health_max_score: scores.health.max,
        health_percentage: scores.health.percentage,
        health_nutrition_score: scores.health.components.nutrition,
        health_digestion_score: scores.health.components.digestion,
        health_exercise_score: scores.health.components.exercise,
        health_water_score: scores.health.components.water,
        health_sunlight_score: scores.health.components.sunlight,
        health_sleep_score: scores.health.components.sleep,
        health_outdoor_air_score: scores.health.components.outdoorAir,
        health_oral_care_score: scores.health.components.oralCare,
        health_skin_care_score: scores.health.components.skinCare,
        
        // Wealth scores
        wealth_total_score: scores.wealth.total,
        wealth_max_score: scores.wealth.max,
        wealth_percentage: scores.wealth.percentage,
        wealth_quality_score: scores.wealth.components.quality,
        wealth_quantity_score: scores.wealth.components.quantity,
        wealth_diversity_score: scores.wealth.components.diversity,
        wealth_workplace_score: scores.wealth.components.workplace,
        wealth_creativity_score: scores.wealth.components.creativity,
        wealth_rest_relaxation_score: scores.wealth.components.restRelaxation,
        
        // Relationships scores
        relationships_total_score: scores.relationships.total,
        relationships_max_score: scores.relationships.max,
        relationships_percentage: scores.relationships.percentage,
        relationships_mental_wellbeing_score: scores.relationships.components.mentalWellbeing,
        relationships_emotional_wellbeing_score: scores.relationships.components.emotionalWellbeing,
        relationships_partner_score: scores.relationships.components.partner,
        relationships_parents_score: scores.relationships.components.parents,
        relationships_children_score: scores.relationships.components.children,
        relationships_relatives_score: scores.relationships.components.relatives,
        relationships_friends_score: scores.relationships.components.friends,
        relationships_universal_oneness_score: scores.relationships.components.universalOneness
      };

      console.log('📊 AssessmentScoreService: Prepared score data:', scoreData);

      // Try to save to Supabase first
      const { data, error } = await supabase
        .from('HS_assessment_scores')
        .insert(scoreData)
        .select('id')
        .single();

      if (error) {
        console.error('❌ AssessmentScoreService: Supabase insert failed:', error);
        
        // Fallback to localStorage if Supabase fails
        console.log('🔄 AssessmentScoreService: Falling back to localStorage...');
        this.saveScoresToLocalStorage(assessmentId, scoreData);
        
        return {
          success: false,
          error: `Supabase failed: ${error.message}. Scores saved to localStorage as fallback.`
        };
      }

      console.log('✅ AssessmentScoreService: Scores saved successfully to Supabase:', data);
      
      // Also save to localStorage as backup
      this.saveScoresToLocalStorage(assessmentId, scoreData);
      
      return {
        success: true,
        scoreId: data.id
      };

    } catch (error) {
      console.error('❌ AssessmentScoreService: Error saving scores:', error);
      
      // Fallback to localStorage
      try {
        const scoreData: AssessmentScoreData = {
          assessment_id: assessmentId,
          user_id: userId || null,
          guest_id: guestId || null,
          total_questions_answered: totalQuestionsAnswered,
          overall_total_score: scores.overall.total,
          overall_max_score: scores.overall.max,
          overall_percentage: scores.overall.percentage,
          overall_grade: scores.overall.grade,
          overall_level: scores.overall.level,
          health_total_score: scores.health.total,
          health_max_score: scores.health.max,
          health_percentage: scores.health.percentage,
          health_nutrition_score: scores.health.components.nutrition,
          health_digestion_score: scores.health.components.digestion,
          health_exercise_score: scores.health.components.exercise,
          health_water_score: scores.health.components.water,
          health_sunlight_score: scores.health.components.sunlight,
          health_sleep_score: scores.health.components.sleep,
          health_outdoor_air_score: scores.health.components.outdoorAir,
          health_oral_care_score: scores.health.components.oralCare,
          health_skin_care_score: scores.health.components.skinCare,
          wealth_total_score: scores.wealth.total,
          wealth_max_score: scores.wealth.max,
          wealth_percentage: scores.wealth.percentage,
          wealth_quality_score: scores.wealth.components.quality,
          wealth_quantity_score: scores.wealth.components.quantity,
          wealth_diversity_score: scores.wealth.components.diversity,
          wealth_workplace_score: scores.wealth.components.workplace,
          wealth_creativity_score: scores.wealth.components.creativity,
          wealth_rest_relaxation_score: scores.wealth.components.restRelaxation,
          relationships_total_score: scores.relationships.total,
          relationships_max_score: scores.relationships.max,
          relationships_percentage: scores.relationships.percentage,
          relationships_mental_wellbeing_score: scores.relationships.components.mentalWellbeing,
          relationships_emotional_wellbeing_score: scores.relationships.components.emotionalWellbeing,
          relationships_partner_score: scores.relationships.components.partner,
          relationships_parents_score: scores.relationships.components.parents,
          relationships_children_score: scores.relationships.components.children,
          relationships_relatives_score: scores.relationships.components.relatives,
          relationships_friends_score: scores.relationships.components.friends,
          relationships_universal_oneness_score: scores.relationships.components.universalOneness
        };
        
        this.saveScoresToLocalStorage(assessmentId, scoreData);
        
        return {
          success: false,
          error: `Error: ${error instanceof Error ? error.message : 'Unknown error'}. Scores saved to localStorage as fallback.`
        };
      } catch (localStorageError) {
        console.error('❌ AssessmentScoreService: localStorage fallback also failed:', localStorageError);
        return {
          success: false,
          error: `Failed to save scores: ${error instanceof Error ? error.message : 'Unknown error'}`
        };
      }
    }
  }

  /**
   * Retrieve assessment scores from the database
   */
  async getAssessmentScores(
    assessmentId: string,
    userId?: string | null,
    guestId?: string | null
  ): Promise<{ success: boolean; scores?: AssessmentScoreData; error?: string }> {
    try {
      console.log('📊 AssessmentScoreService: Retrieving assessment scores...', {
        assessmentId,
        userId,
        guestId
      });

      // Try to get from Supabase first
      let query = supabase
        .from('HS_assessment_scores')
        .select('*')
        .eq('assessment_id', assessmentId);

      if (userId) {
        query = query.eq('user_id', userId);
      } else if (guestId) {
        query = query.eq('guest_id', guestId);
      }

      const { data, error } = await query.single();

      if (error) {
        console.log('⚠️ AssessmentScoreService: Supabase query failed, trying localStorage...', error);
        
        // Fallback to localStorage
        const localStorageScores = this.getScoresFromLocalStorage(assessmentId);
        if (localStorageScores) {
          console.log('✅ AssessmentScoreService: Retrieved scores from localStorage');
          return {
            success: true,
            scores: localStorageScores
          };
        }
        
        return {
          success: false,
          error: `No scores found in database or localStorage for assessment ${assessmentId}`
        };
      }

      console.log('✅ AssessmentScoreService: Retrieved scores from Supabase:', data);
      return {
        success: true,
        scores: data as AssessmentScoreData
      };

    } catch (error) {
      console.error('❌ AssessmentScoreService: Error retrieving scores:', error);
      
      // Fallback to localStorage
      const localStorageScores = this.getScoresFromLocalStorage(assessmentId);
      if (localStorageScores) {
        console.log('✅ AssessmentScoreService: Retrieved scores from localStorage as fallback');
        return {
          success: true,
          scores: localStorageScores
        };
      }
      
      return {
        success: false,
        error: `Error retrieving scores: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }

  /**
   * Get all assessment scores for a user or guest
   */
  async getAllAssessmentScores(
    userId?: string | null,
    guestId?: string | null
  ): Promise<{ success: boolean; scores?: AssessmentScoreData[]; error?: string }> {
    try {
      console.log('📊 AssessmentScoreService: Retrieving all assessment scores...', {
        userId,
        guestId
      });

      // Try to get from Supabase first
      let query = supabase
        .from('HS_assessment_scores')
        .select('*')
        .order('created_at', { ascending: false });

      if (userId) {
        query = query.eq('user_id', userId);
      } else if (guestId) {
        query = query.eq('guest_id', guestId);
      }

      const { data, error } = await query;

      if (error) {
        console.log('⚠️ AssessmentScoreService: Supabase query failed, trying localStorage...', error);
        
        // Fallback to localStorage
        const localStorageScores = this.getAllScoresFromLocalStorage(userId, guestId);
        if (localStorageScores.length > 0) {
          console.log('✅ AssessmentScoreService: Retrieved scores from localStorage');
          return {
            success: true,
            scores: localStorageScores
          };
        }
        
        return {
          success: false,
          error: `No scores found in database or localStorage`
        };
      }

      console.log('✅ AssessmentScoreService: Retrieved scores from Supabase:', data);
      return {
        success: true,
        scores: data as AssessmentScoreData[]
      };

    } catch (error) {
      console.error('❌ AssessmentScoreService: Error retrieving all scores:', error);
      
      // Fallback to localStorage
      const localStorageScores = this.getAllScoresFromLocalStorage(userId, guestId);
      if (localStorageScores.length > 0) {
        console.log('✅ AssessmentScoreService: Retrieved scores from localStorage as fallback');
        return {
          success: true,
          scores: localStorageScores
        };
      }
      
      return {
        success: false,
        error: `Error retrieving scores: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }

  /**
   * Delete assessment scores
   */
  async deleteAssessmentScores(
    assessmentId: string,
    userId?: string | null,
    guestId?: string | null
  ): Promise<{ success: boolean; error?: string }> {
    try {
      console.log('🗑️ AssessmentScoreService: Deleting assessment scores...', {
        assessmentId,
        userId,
        guestId
      });

      // Try to delete from Supabase first
      let query = supabase
        .from('HS_assessment_scores')
        .delete()
        .eq('assessment_id', assessmentId);

      if (userId) {
        query = query.eq('user_id', userId);
      } else if (guestId) {
        query = query.eq('guest_id', guestId);
      }

      const { error } = await query;

      if (error) {
        console.error('❌ AssessmentScoreService: Supabase delete failed:', error);
        return {
          success: false,
          error: `Failed to delete from database: ${error.message}`
        };
      }

      // Also delete from localStorage
      this.deleteScoresFromLocalStorage(assessmentId);

      console.log('✅ AssessmentScoreService: Scores deleted successfully');
      return { success: true };

    } catch (error) {
      console.error('❌ AssessmentScoreService: Error deleting scores:', error);
      return {
        success: false,
        error: `Error deleting scores: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }

  // Private helper methods for localStorage fallback

  private saveScoresToLocalStorage(assessmentId: string, scoreData: AssessmentScoreData): void {
    try {
      const key = `assessment_scores_${assessmentId}`;
      localStorage.setItem(key, JSON.stringify(scoreData));
      console.log('💾 AssessmentScoreService: Scores saved to localStorage as backup');
    } catch (error) {
      console.error('❌ AssessmentScoreService: Failed to save to localStorage:', error);
    }
  }

  private getScoresFromLocalStorage(assessmentId: string): AssessmentScoreData | null {
    try {
      const key = `assessment_scores_${assessmentId}`;
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('❌ AssessmentScoreService: Failed to retrieve from localStorage:', error);
      return null;
    }
  }

  private getAllScoresFromLocalStorage(
    userId?: string | null,
    guestId?: string | null
  ): AssessmentScoreData[] {
    try {
      const scores: AssessmentScoreData[] = [];
      
      // Iterate through localStorage to find all assessment scores
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('assessment_scores_')) {
          try {
            const scoreData = JSON.parse(localStorage.getItem(key) || '');
            if (scoreData) {
              // Filter by user_id or guest_id if provided
              if (userId && scoreData.user_id === userId) {
                scores.push(scoreData);
              } else if (guestId && scoreData.guest_id === guestId) {
                scores.push(scoreData);
              } else if (!userId && !guestId) {
                // If no filter provided, include all
                scores.push(scoreData);
              }
            }
          } catch (parseError) {
            console.warn('⚠️ AssessmentScoreService: Failed to parse localStorage item:', key);
          }
        }
      }
      
      // Sort by created_at descending
      return scores.sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    } catch (error) {
      console.error('❌ AssessmentScoreService: Failed to retrieve all scores from localStorage:', error);
      return [];
    }
  }

  private deleteScoresFromLocalStorage(assessmentId: string): void {
    try {
      const key = `assessment_scores_${assessmentId}`;
      localStorage.removeItem(key);
      console.log('🗑️ AssessmentScoreService: Scores deleted from localStorage');
    } catch (error) {
      console.error('❌ AssessmentScoreService: Failed to delete from localStorage:', error);
    }
  }
}

// Export singleton instance
export const assessmentScoreService = new AssessmentScoreService();
export default assessmentScoreService;

