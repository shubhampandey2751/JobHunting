import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Download, Eye, Trash2 } from "lucide-react";

const ResumeBuilder = () => {
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: "",
      email: "",
      phone: "",
      location: "",
      summary: "",
    },
    experience: [
      {
        id: 1,
        title: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
    education: [
      {
        id: 1,
        degree: "",
        school: "",
        location: "",
        graduationDate: "",
      },
    ],
    skills: [],
    newSkill: "",
  });

  const addExperience = () => {
    setResumeData({
      ...resumeData,
      experience: [
        ...resumeData.experience,
        {
          id: Date.now(),
          title: "",
          company: "",
          location: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    });
  };

  const removeExperience = (id: number) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.filter((exp) => exp.id !== id),
    });
  };

  const addEducation = () => {
    setResumeData({
      ...resumeData,
      education: [
        ...resumeData.education,
        {
          id: Date.now(),
          degree: "",
          school: "",
          location: "",
          graduationDate: "",
        },
      ],
    });
  };

  const removeEducation = (id: number) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.filter((edu) => edu.id !== id),
    });
  };

  const addSkill = () => {
    if (resumeData.newSkill.trim()) {
      setResumeData({
        ...resumeData,
        skills: [...resumeData.skills, resumeData.newSkill.trim()],
        newSkill: "",
      });
    }
  };

  const removeSkill = (index: number) => {
    setResumeData({
      ...resumeData,
      skills: resumeData.skills.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold font-poppins text-foreground mb-4">
            Resume Builder
          </h1>
          <p className="text-xl text-muted-foreground">
            Create a professional resume in minutes
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Full Name"
                  value={resumeData.personalInfo.name}
                  onChange={(e) =>
                    setResumeData({
                      ...resumeData,
                      personalInfo: { ...resumeData.personalInfo, name: e.target.value },
                    })
                  }
                />
                <Input
                  type="email"
                  placeholder="Email"
                  value={resumeData.personalInfo.email}
                  onChange={(e) =>
                    setResumeData({
                      ...resumeData,
                      personalInfo: { ...resumeData.personalInfo, email: e.target.value },
                    })
                  }
                />
                <Input
                  placeholder="Phone Number"
                  value={resumeData.personalInfo.phone}
                  onChange={(e) =>
                    setResumeData({
                      ...resumeData,
                      personalInfo: { ...resumeData.personalInfo, phone: e.target.value },
                    })
                  }
                />
                <Input
                  placeholder="Location"
                  value={resumeData.personalInfo.location}
                  onChange={(e) =>
                    setResumeData({
                      ...resumeData,
                      personalInfo: { ...resumeData.personalInfo, location: e.target.value },
                    })
                  }
                />
                <Textarea
                  placeholder="Professional Summary"
                  className="min-h-[100px]"
                  value={resumeData.personalInfo.summary}
                  onChange={(e) =>
                    setResumeData({
                      ...resumeData,
                      personalInfo: { ...resumeData.personalInfo, summary: e.target.value },
                    })
                  }
                />
              </CardContent>
            </Card>

            {/* Experience */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Work Experience</CardTitle>
                <Button onClick={addExperience} size="sm" className="bg-gradient-primary">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Experience
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {resumeData.experience.map((exp, index) => (
                  <div key={exp.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Experience {index + 1}</h4>
                      {resumeData.experience.length > 1 && (
                        <Button
                          onClick={() => removeExperience(exp.id)}
                          size="sm"
                          variant="ghost"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                      <Input placeholder="Job Title" />
                      <Input placeholder="Company" />
                      <Input placeholder="Location" />
                      <Input placeholder="Start Date" />
                      <Input placeholder="End Date" />
                    </div>
                    <Textarea
                      placeholder="Job Description"
                      className="min-h-[80px]"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Education */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Education</CardTitle>
                <Button onClick={addEducation} size="sm" className="bg-gradient-primary">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Education
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {resumeData.education.map((edu, index) => (
                  <div key={edu.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Education {index + 1}</h4>
                      {resumeData.education.length > 1 && (
                        <Button
                          onClick={() => removeEducation(edu.id)}
                          size="sm"
                          variant="ghost"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                      <Input placeholder="Degree" />
                      <Input placeholder="School/University" />
                      <Input placeholder="Location" />
                      <Input placeholder="Graduation Date" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle>Skills</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a skill"
                    value={resumeData.newSkill}
                    onChange={(e) =>
                      setResumeData({ ...resumeData, newSkill: e.target.value })
                    }
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addSkill();
                      }
                    }}
                  />
                  <Button onClick={addSkill} className="bg-gradient-primary">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={() => removeSkill(index)}
                    >
                      {skill} ×
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview Section */}
          <div className="lg:sticky lg:top-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Resume Preview</CardTitle>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                  <Button size="sm" className="bg-gradient-primary">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-white text-black p-6 rounded-lg min-h-[600px] shadow-inner">
                  {/* Resume Preview Content */}
                  <div className="space-y-4">
                    <div className="text-center border-b pb-4">
                      <h2 className="text-2xl font-bold">
                        {resumeData.personalInfo.name || "Your Name"}
                      </h2>
                      <p className="text-gray-600">
                        {resumeData.personalInfo.email} | {resumeData.personalInfo.phone} | {resumeData.personalInfo.location}
                      </p>
                    </div>

                    {resumeData.personalInfo.summary && (
                      <div>
                        <h3 className="font-bold text-lg mb-2">Professional Summary</h3>
                        <p className="text-gray-700">{resumeData.personalInfo.summary}</p>
                      </div>
                    )}

                    <div>
                      <h3 className="font-bold text-lg mb-2">Work Experience</h3>
                      <div className="space-y-3">
                        {resumeData.experience.map((exp, index) => (
                          <div key={exp.id}>
                            <p className="font-medium">Position {index + 1}</p>
                            <p className="text-gray-600 text-sm">Company • Location • Dates</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-bold text-lg mb-2">Education</h3>
                      <div className="space-y-2">
                        {resumeData.education.map((edu, index) => (
                          <div key={edu.id}>
                            <p className="font-medium">Degree {index + 1}</p>
                            <p className="text-gray-600 text-sm">School • Location • Date</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {resumeData.skills.length > 0 && (
                      <div>
                        <h3 className="font-bold text-lg mb-2">Skills</h3>
                        <p className="text-gray-700">{resumeData.skills.join(", ")}</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ResumeBuilder;