export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      HS_assessments: {
        Row: {
          completed_at: string | null
          created_at: string
          current_index: number
          id: string
          started_at: string | null
          status: Database["public"]["Enums"]["hs_assessment_status"]
          total_questions: number
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          current_index?: number
          id?: string
          started_at?: string | null
          status?: Database["public"]["Enums"]["hs_assessment_status"]
          total_questions?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          current_index?: number
          id?: string
          started_at?: string | null
          status?: Database["public"]["Enums"]["hs_assessment_status"]
          total_questions?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      HS_question_options: {
        Row: {
          created_at: string
          id: string
          label: string
          order_index: number
          question_id: string
          value: number
        }
        Insert: {
          created_at?: string
          id?: string
          label: string
          order_index: number
          question_id: string
          value: number
        }
        Update: {
          created_at?: string
          id?: string
          label?: string
          order_index?: number
          question_id?: string
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "HS_question_options_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "HS_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      HS_questions: {
        Row: {
          category: Database["public"]["Enums"]["hs_category"]
          created_at: string
          description: string | null
          id: string
          order_index: number
          title: string
        }
        Insert: {
          category: Database["public"]["Enums"]["hs_category"]
          created_at?: string
          description?: string | null
          id?: string
          order_index: number
          title: string
        }
        Update: {
          category?: Database["public"]["Enums"]["hs_category"]
          created_at?: string
          description?: string | null
          id?: string
          order_index?: number
          title?: string
        }
        Relationships: []
      }
      HS_responses: {
        Row: {
          answer_text: string | null
          assessment_id: string
          created_at: string
          id: string
          option_id: string | null
          question_id: string
          updated_at: string
        }
        Insert: {
          answer_text?: string | null
          assessment_id: string
          created_at?: string
          id?: string
          option_id?: string | null
          question_id: string
          updated_at?: string
        }
        Update: {
          answer_text?: string | null
          assessment_id?: string
          created_at?: string
          id?: string
          option_id?: string | null
          question_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "HS_responses_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "HS_assessments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "HS_responses_option_id_fkey"
            columns: ["option_id"]
            isOneToOne: false
            referencedRelation: "HS_question_options"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "HS_responses_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "HS_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      HS_user_profiles: {
        Row: {
          age: number | null
          created_at: string
          email: string | null
          gender: string | null
          id: string
          location: string | null
          occupation: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          age?: number | null
          created_at?: string
          email?: string | null
          gender?: string | null
          id?: string
          location?: string | null
          occupation?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          age?: number | null
          created_at?: string
          email?: string | null
          gender?: string | null
          id?: string
          location?: string | null
          occupation?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      hwr_scores: {
        Row: {
          age: number | null
          assessment_date: string | null
          created_at: string | null
          health_score: number
          id: string
          relationship_score: number
          total_score: number
          user_id: string | null
          wealth_score: number
        }
        Insert: {
          age?: number | null
          assessment_date?: string | null
          created_at?: string | null
          health_score: number
          id?: string
          relationship_score: number
          total_score: number
          user_id?: string | null
          wealth_score: number
        }
        Update: {
          age?: number | null
          assessment_date?: string | null
          created_at?: string | null
          health_score?: number
          id?: string
          relationship_score?: number
          total_score?: number
          user_id?: string | null
          wealth_score?: number
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          age: number | null
          created_at: string | null
          email: string | null
          gender: string | null
          id: string
          location: string | null
          occupation: string | null
        }
        Insert: {
          age?: number | null
          created_at?: string | null
          email?: string | null
          gender?: string | null
          id?: string
          location?: string | null
          occupation?: string | null
        }
        Update: {
          age?: number | null
          created_at?: string | null
          email?: string | null
          gender?: string | null
          id?: string
          location?: string | null
          occupation?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      hs_assessment_status: "not_started" | "in_progress" | "completed"
      hs_category: "health" | "wealth" | "relationships"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      hs_assessment_status: ["not_started", "in_progress", "completed"],
      hs_category: ["health", "wealth", "relationships"],
    },
  },
} as const
