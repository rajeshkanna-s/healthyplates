-- Update admin user password using Supabase's built-in function
-- First, let's get the user ID for the admin email
DO $$
DECLARE
    admin_user_id uuid;
BEGIN
    -- Get the user ID for the admin email
    SELECT id INTO admin_user_id 
    FROM auth.users 
    WHERE email = 'durbinyarul@gmail.com';
    
    -- Update the password using auth.users table (encrypted)
    -- Note: This requires direct database access with appropriate permissions
    IF admin_user_id IS NOT NULL THEN
        -- Use crypt function to hash the password properly
        UPDATE auth.users 
        SET 
            encrypted_password = crypt('durbinyarul@6890', gen_salt('bf')),
            updated_at = now()
        WHERE id = admin_user_id;
        
        RAISE NOTICE 'Admin password updated successfully for user ID: %', admin_user_id;
    ELSE
        RAISE EXCEPTION 'Admin user with email durbinyarul@gmail.com not found';
    END IF;
END $$;