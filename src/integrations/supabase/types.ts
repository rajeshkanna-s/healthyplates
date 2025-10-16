export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      blogs: {
        Row: {
          author_name: string | null
          category: string | null
          content: string
          cover_image_url: string | null
          created_at: string
          excerpt: string | null
          id: string
          status: string | null
          tags: string[] | null
          title: string
          updated_at: string
          views_count: number | null
        }
        Insert: {
          author_name?: string | null
          category?: string | null
          content: string
          cover_image_url?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          status?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string
          views_count?: number | null
        }
        Update: {
          author_name?: string | null
          category?: string | null
          content?: string
          cover_image_url?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          status?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string
          views_count?: number | null
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      disease_foods: {
        Row: {
          benefits: string
          created_at: string
          disease_id: string | null
          food_name: string
          frequency: string | null
          how_much: string | null
          id: string
          image_url: string | null
          preparation_method: string | null
          updated_at: string
        }
        Insert: {
          benefits: string
          created_at?: string
          disease_id?: string | null
          food_name: string
          frequency?: string | null
          how_much?: string | null
          id?: string
          image_url?: string | null
          preparation_method?: string | null
          updated_at?: string
        }
        Update: {
          benefits?: string
          created_at?: string
          disease_id?: string | null
          food_name?: string
          frequency?: string | null
          how_much?: string | null
          id?: string
          image_url?: string | null
          preparation_method?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "disease_foods_disease_id_fkey"
            columns: ["disease_id"]
            isOneToOne: false
            referencedRelation: "diseases"
            referencedColumns: ["id"]
          },
        ]
      }
      diseases: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          symptoms: string[] | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          symptoms?: string[] | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          symptoms?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
      faqs: {
        Row: {
          answer: string
          category: string | null
          created_at: string
          id: string
          is_featured: boolean | null
          keywords: string[] | null
          question: string
          updated_at: string
          views_count: number | null
        }
        Insert: {
          answer: string
          category?: string | null
          created_at?: string
          id?: string
          is_featured?: boolean | null
          keywords?: string[] | null
          question: string
          updated_at?: string
          views_count?: number | null
        }
        Update: {
          answer?: string
          category?: string | null
          created_at?: string
          id?: string
          is_featured?: boolean | null
          keywords?: string[] | null
          question?: string
          updated_at?: string
          views_count?: number | null
        }
        Relationships: []
      }
      food_products: {
        Row: {
          advantages: string[] | null
          category_id: string | null
          created_at: string
          description: string | null
          disadvantages: string[] | null
          id: string
          image_url: string | null
          is_indian: boolean | null
          key_ingredients: string[] | null
          medicinal_benefits: string | null
          name: string
          nutrition_facts: Json | null
          origin: string | null
          purpose: string
          region: string | null
          updated_at: string
        }
        Insert: {
          advantages?: string[] | null
          category_id?: string | null
          created_at?: string
          description?: string | null
          disadvantages?: string[] | null
          id?: string
          image_url?: string | null
          is_indian?: boolean | null
          key_ingredients?: string[] | null
          medicinal_benefits?: string | null
          name: string
          nutrition_facts?: Json | null
          origin?: string | null
          purpose: string
          region?: string | null
          updated_at?: string
        }
        Update: {
          advantages?: string[] | null
          category_id?: string | null
          created_at?: string
          description?: string | null
          disadvantages?: string[] | null
          id?: string
          image_url?: string | null
          is_indian?: boolean | null
          key_ingredients?: string[] | null
          medicinal_benefits?: string | null
          name?: string
          nutrition_facts?: Json | null
          origin?: string | null
          purpose?: string
          region?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "food_products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      food_timing: {
        Row: {
          benefits: string
          created_at: string
          description: string | null
          how_much: string | null
          id: string
          image_url: string | null
          meal_time: string
          name: string
          preparation_tips: string | null
          updated_at: string
        }
        Insert: {
          benefits: string
          created_at?: string
          description?: string | null
          how_much?: string | null
          id?: string
          image_url?: string | null
          meal_time: string
          name: string
          preparation_tips?: string | null
          updated_at?: string
        }
        Update: {
          benefits?: string
          created_at?: string
          description?: string | null
          how_much?: string | null
          id?: string
          image_url?: string | null
          meal_time?: string
          name?: string
          preparation_tips?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          mobile_number: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          mobile_number?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          mobile_number?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      self_care_categories: {
        Row: {
          created_at: string
          description: string | null
          icon: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      self_care_procedures: {
        Row: {
          benefits: string[] | null
          category_id: string | null
          created_at: string
          description: string | null
          duration: string | null
          frequency: string | null
          id: string
          image_url: string | null
          ingredients: string[] | null
          precautions: string[] | null
          steps: string[]
          title: string
          updated_at: string
        }
        Insert: {
          benefits?: string[] | null
          category_id?: string | null
          created_at?: string
          description?: string | null
          duration?: string | null
          frequency?: string | null
          id?: string
          image_url?: string | null
          ingredients?: string[] | null
          precautions?: string[] | null
          steps: string[]
          title: string
          updated_at?: string
        }
        Update: {
          benefits?: string[] | null
          category_id?: string | null
          created_at?: string
          description?: string | null
          duration?: string | null
          frequency?: string | null
          id?: string
          image_url?: string | null
          ingredients?: string[] | null
          precautions?: string[] | null
          steps?: string[]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "self_care_procedures_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "self_care_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      site_settings: {
        Row: {
          created_at: string
          description: string | null
          id: string
          setting_key: string
          setting_value: Json
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          setting_key: string
          setting_value?: Json
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          setting_key?: string
          setting_value?: Json
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_email_exists: {
        Args: { email_to_check: string }
        Returns: boolean
      }
      check_mobile_exists: {
        Args: { mobile_to_check: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
