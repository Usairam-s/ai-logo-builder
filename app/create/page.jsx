"use client";
import { useState } from "react";
import LogoTitle from "./_components/LogoTitle";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import LogoDescription from "./_components/LogoDescription";
import LogoColorPallete from "./_components/LogoColorPallete";
import LogoDesign from "./_components/LogoDesign";
import LogoIdea from "./_components/LogoIdea";

function page() {
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    pallete: "",
    design: {
      title: "",
      prompt: "",
    },
    idea: "",
  });
  const handleChange = (name, value) => {
    setFormData((prev) => {
      const updatedFormData = {
        ...prev,
        [name]: value, // Dynamically update formData
      };
      console.log("Updated FormData:", updatedFormData); // Log the updated state
      return updatedFormData;
    });
  };

  //handledesign chnages
  // Handle design changes
  const handleDesignChange = (designTitle, designPrompt) => {
    console.log("Received Design Data: ", { designTitle, designPrompt }); // Log received data

    setFormData((prev) => {
      const updatedFormData = {
        ...prev,
        design: {
          title: designTitle,
          prompt: designPrompt,
        },
      };
      console.log("Updated FormData with Design:", updatedFormData); // Log updated formData
      return updatedFormData;
    });
  };

  // Function to handle step navigation
  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
    console.log(currentStep);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
    console.log(currentStep);
  };
  return (
    <>
      <div className="max-w-4xl mx-auto mt-32 p-4 border rounded-lg shadow-md">
        {(() => {
          switch (currentStep) {
            case 1:
              return (
                <LogoTitle
                  value={formData.title}
                  onHandleInputChange={(v) => handleChange("title", v)}
                />
              );
            case 2:
              return (
                <LogoDescription
                  value={formData.desc} // Pass the description from parent
                  onHandleInputChange={(v) => handleChange("desc", v)}
                />
              );
            case 3:
              return (
                <LogoColorPallete
                  onHandleInputChange={(v) => handleChange("pallete", v)}
                  value={formData.pallete} // Pass the description from parent
                />
              );
            case 4:
              return (
                <LogoDesign
                  value={formData.design.title}
                  onDesignSelect={handleDesignChange}
                />
              );
            case 5:
              return (
                <LogoIdea
                  value={formData.idea}
                  onHandleInputChange={(v) => handleChange("idea", v)}
                  data={formData}
                />
              );
            default:
              return null; // Handle invalid steps gracefully
          }
        })()}

        {/* Conditionally render navigation buttons */}
        {currentStep !== 5 && (
          <div className="w-full px-6 items-center flex justify-between mt-2">
            <Button onClick={prevStep} variant="outline">
              <ArrowLeft /> Back
            </Button>
            <Button onClick={nextStep}>
              <ArrowRight /> Continue
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

export default page;
