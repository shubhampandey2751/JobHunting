-- Create companies table
CREATE TABLE public.companies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  logo_url TEXT,
  description TEXT,
  website_url TEXT,
  industry TEXT,
  size TEXT,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create jobs table
CREATE TABLE public.jobs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  location TEXT,
  job_type TEXT, -- full-time, part-time, contract, etc.
  salary_min INTEGER,
  salary_max INTEGER,
  currency TEXT DEFAULT 'USD',
  description TEXT,
  requirements TEXT[],
  skills TEXT[],
  benefits TEXT[],
  posted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user profiles table for additional user info
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Companies policies (public read access)
CREATE POLICY "Companies are viewable by everyone" 
ON public.companies 
FOR SELECT 
USING (true);

-- Jobs policies (public read access)
CREATE POLICY "Jobs are viewable by everyone" 
ON public.jobs 
FOR SELECT 
USING (is_active = true);

-- Profiles policies
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_companies_updated_at
BEFORE UPDATE ON public.companies
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_jobs_updated_at
BEFORE UPDATE ON public.jobs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name, email)
  VALUES (
    NEW.id, 
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name',
    NEW.email
  );
  RETURN NEW;
END;
$$;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample companies
INSERT INTO public.companies (name, logo_url, description, industry, size, location) VALUES
('Google', 'https://logo.clearbit.com/google.com', 'Global technology leader focused on organizing world information', 'Technology', '100,000+', 'Mountain View, CA'),
('Microsoft', 'https://logo.clearbit.com/microsoft.com', 'Leading technology company creating platforms and productivity tools', 'Technology', '100,000+', 'Redmond, WA'),
('Apple', 'https://logo.clearbit.com/apple.com', 'Innovative consumer electronics and software company', 'Technology', '100,000+', 'Cupertino, CA'),
('Amazon', 'https://logo.clearbit.com/amazon.com', 'E-commerce and cloud computing giant', 'Technology', '100,000+', 'Seattle, WA'),
('Meta', 'https://logo.clearbit.com/meta.com', 'Social media and virtual reality technology company', 'Technology', '50,000+', 'Menlo Park, CA'),
('Netflix', 'https://logo.clearbit.com/netflix.com', 'Streaming entertainment and content creation platform', 'Entertainment', '10,000+', 'Los Gatos, CA'),
('Spotify', 'https://logo.clearbit.com/spotify.com', 'Music streaming and audio content platform', 'Entertainment', '5,000+', 'Stockholm, Sweden'),
('Airbnb', 'https://logo.clearbit.com/airbnb.com', 'Online marketplace for lodging and travel experiences', 'Travel', '5,000+', 'San Francisco, CA');

-- Insert sample jobs
INSERT INTO public.jobs (title, company_id, location, job_type, salary_min, salary_max, description, requirements, skills, benefits) 
SELECT 
  'Senior Software Engineer',
  c.id,
  'San Francisco, CA',
  'Full-time',
  150000,
  200000,
  'Join our team to build scalable systems and innovative products that impact millions of users worldwide.',
  ARRAY['Bachelor''s degree in Computer Science', '5+ years of software development experience', 'Experience with distributed systems'],
  ARRAY['React', 'Node.js', 'TypeScript', 'AWS', 'Docker'],
  ARRAY['Health insurance', 'Stock options', 'Flexible PTO', 'Remote work options']
FROM public.companies c WHERE c.name = 'Google'
UNION ALL
SELECT 
  'Product Designer',
  c.id,
  'Remote',
  'Full-time',
  120000,
  160000,
  'Design beautiful and intuitive user experiences for our next-generation products.',
  ARRAY['Bachelor''s degree in Design or related field', '3+ years of product design experience', 'Portfolio showcasing UI/UX work'],
  ARRAY['Figma', 'Sketch', 'Prototyping', 'User Research', 'Design Systems'],
  ARRAY['Health insurance', 'Design equipment stipend', 'Learning budget', 'Flexible hours']
FROM public.companies c WHERE c.name = 'Apple'
UNION ALL
SELECT 
  'Data Scientist',
  c.id,
  'Seattle, WA',
  'Full-time',
  130000,
  180000,
  'Analyze large datasets to derive insights and build machine learning models for recommendation systems.',
  ARRAY['MS/PhD in Data Science, Statistics, or related field', '3+ years of data science experience', 'Experience with ML frameworks'],
  ARRAY['Python', 'SQL', 'TensorFlow', 'Pandas', 'Statistics'],
  ARRAY['Health insurance', 'Stock options', 'Learning stipend', 'Gym membership']
FROM public.companies c WHERE c.name = 'Amazon'
UNION ALL
SELECT 
  'Frontend Developer',
  c.id,
  'Austin, TX',
  'Full-time',
  90000,
  130000,
  'Build responsive web applications and enhance user interfaces for our streaming platform.',
  ARRAY['Bachelor''s degree or equivalent experience', '2+ years of frontend development', 'Experience with modern frameworks'],
  ARRAY['React', 'JavaScript', 'CSS', 'HTML', 'Redux'],
  ARRAY['Health insurance', 'Netflix subscription', 'Flexible PTO', 'Learning budget']
FROM public.companies c WHERE c.name = 'Netflix'
UNION ALL
SELECT 
  'DevOps Engineer',
  c.id,
  'New York, NY',
  'Full-time',
  110000,
  150000,
  'Manage cloud infrastructure and implement CI/CD pipelines for our music streaming service.',
  ARRAY['Bachelor''s degree in Engineering or related field', '3+ years of DevOps experience', 'Cloud platform expertise'],
  ARRAY['AWS', 'Kubernetes', 'Docker', 'Terraform', 'Jenkins'],
  ARRAY['Health insurance', 'Spotify Premium', 'Remote work', 'Stock options']
FROM public.companies c WHERE c.name = 'Spotify';