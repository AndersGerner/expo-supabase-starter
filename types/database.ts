export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      posts: {
        Row: {
          id: number;
          created_at: string;
          title: string | null;
          content: string | null;
          is_published: boolean | null;
        };
        Insert: {
          id?: number;
          created_at?: string;
          title?: string | null;
          content?: string | null;
          is_published?: boolean | null;
        };
        Update: {
          id?: number;
          created_at?: string;
          title?: string | null;
          content?: string | null;
          is_published?: boolean | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
