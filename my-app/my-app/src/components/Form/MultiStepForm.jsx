import axios from "axios";
import React, { useState, useEffect } from "react";

const MultiStepForm = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        profilePhoto: null,
        username: "",
        currentPassword: "",
        newPassword: "",
        profession: "",
        companyName: "",
        addressLine1: "",
        country: "",
        state: "",
        city: "",
        subscriptionPlan: "Basic",
        newsletter: true,
    });

    const countries = [
        { id: "india", name: "India" },
        { id: "usa", name: "USA" }
    ];

    const statesMap = {
        india: [
            { id: "mh", name: "Maharashtra" },
            { id: "dl", name: "Delhi" }
        ],
        usa: [
            { id: "ca", name: "California" },
            { id: "ny", name: "New York" }
        ]
    };

    const citiesMap = {
        mh: [
            { id: "mumbai", name: "Mumbai" },
            { id: "pune", name: "Pune" }
        ],
        dl: [
            { id: "delhi", name: "New Delhi" }],
        ca: [
            { id: "la", name: "Los Angeles" },
            { id: "sf", name: "San Francisco" }
        ],
        ny: [
            { id: "nyc", name: "New York City" },
            { id: "buffalo", name: "Buffalo" }
        ]
    };

    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    useEffect(() => {
        setStates(statesMap[formData.country] || []);
        setFormData(prev => ({ ...prev, state: "", city: "" }));
    }, [formData.country]);

    useEffect(() => {
        setCities(citiesMap[formData.state] || []);
        setFormData(prev => ({ ...prev, city: "" }));
    }, [formData.state]);

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
        });
    };

    const validateStep = () => {
        switch (step) {
            case 1:
                return formData.profilePhoto &&
                    ["image/jpeg", "image/png"].includes(formData.profilePhoto.type) &&
                    /^[^\s]{4,20}$/.test(formData.username) &&
                    (!formData.newPassword || (formData.currentPassword &&
                        /^(?=.*[!@#$%^&*])(?=.*\d).{8,}$/.test(formData.newPassword)));
            case 2:
                return formData.profession &&
                    (formData.profession !== "Entrepreneur" || formData.companyName) &&
                    formData.addressLine1;
            case 3:
                return formData.country && formData.state && formData.city;
            default:
                return true;
        }
    };

    const nextStep = () => {
        if (validateStep()) setStep(step + 1);
        else alert("Please fill all required fields correctly.");
    };

    const prevStep = () => setStep(step - 1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateStep()) {
            alert("Please fill all required fields correctly.");
            return;
        }

        const payload = new FormData();

        // Append all form fields
        Object.entries(formData).forEach(([key, value]) => {
            if (typeof value === "boolean") {
                payload.append(key, value ? "true" : "false");
            } else if (value) {
                payload.append(key, value);
            }
        });

        try {
            const res = await axios.post("https://registration-l0hq.onrender.com/api/form", payload, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            alert("Form submitted successfully!");
            console.log("Response:", res.data);
        } catch (err) {
            console.error("Submission Error:", err);
            alert("Form submission failed.");
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-xl space-y-6">
            <h2 className="text-2xl font-semibold text-center">Multi-Step Form</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {step === 1 && (
                    <div className="space-y-4">
                        <div>
                            <label className="block font-medium">Profile Photo</label>
                            <input type="file" name="profilePhoto" accept=".jpg,.jpeg,.png" onChange={handleChange} required className="w-full" />
                        </div>
                        <div>
                            <label className="block font-medium">Username</label>
                            <input type="text" name="username" value={formData.username} onChange={handleChange} className="w-full border p-2 rounded" required />
                        </div>
                        <div>
                            <label className="block font-medium">Current Password</label>
                            <input type="password" name="currentPassword" value={formData.currentPassword} onChange={handleChange} className="w-full border p-2 rounded" />
                        </div>
                        <div>
                            <label className="block font-medium">New Password</label>
                            <input type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} className="w-full border p-2 rounded" />
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-4">
                        <div>
                            <label className="block font-medium">Profession</label>
                            <select name="profession" value={formData.profession} onChange={handleChange} className="w-full border p-2 rounded" required>
                                <option value="">Select</option>
                                <option value="Student">Student</option>
                                <option value="Developer">Developer</option>
                                <option value="Entrepreneur">Entrepreneur</option>
                            </select>
                        </div>
                        {formData.profession === "Entrepreneur" && (
                            <div>
                                <label className="block font-medium">Company Name</label>
                                <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="w-full border p-2 rounded" required />
                            </div>
                        )}
                        <div>
                            <label className="block font-medium">Address Line 1</label>
                            <input type="text" name="addressLine1" value={formData.addressLine1} onChange={handleChange} className="w-full border p-2 rounded" required />
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-4">
                        <div>
                            <label className="block font-medium">Country</label>
                            <select name="country" value={formData.country} onChange={handleChange} className="w-full border p-2 rounded" required>
                                <option value="">Select</option>
                                {countries.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block font-medium">State</label>
                            <select name="state" value={formData.state} onChange={handleChange} className="w-full border p-2 rounded" required>
                                <option value="">Select</option>
                                {states.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block font-medium">City</label>
                            <select name="city" value={formData.city} onChange={handleChange} className="w-full border p-2 rounded" required>
                                <option value="">Select</option>
                                {cities.map(ci => <option key={ci.id} value={ci.id}>{ci.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block font-medium">Subscription Plan</label>
                            <select name="subscriptionPlan" value={formData.subscriptionPlan} onChange={handleChange} className="w-full border p-2 rounded">
                                <option value="Basic">Basic</option>
                                <option value="Pro">Pro</option>
                                <option value="Enterprise">Enterprise</option>
                            </select>
                        </div>
                        <div className="flex items-center">
                            <input type="checkbox" name="newsletter" checked={formData.newsletter} onChange={handleChange} className="mr-2" />
                            <label className="font-medium">Subscribe to Newsletter</label>
                        </div>
                    </div>
                )}

                <div className="flex justify-between pt-4">
                    {step > 1 && (
                        <button type="button" onClick={prevStep} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Back</button>
                    )}
                    {step < 3 && (
                        <button type="button" onClick={nextStep} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Next</button>
                    )}
                    {step === 3 && (
                        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Submit</button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default MultiStepForm;