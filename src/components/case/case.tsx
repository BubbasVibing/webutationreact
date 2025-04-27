import React, { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { AppDispatch } from "../../redux-store/store";
import {
  submitWebutationForm,
  resetWebutationFormState,
} from "../../redux-store/webutationFormSlice/webutationFormSlice";
import {
  FaUser,
  FaBuilding,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaFileAlt,
  FaCalendarAlt,
  FaMedkit,
  FaQuestionCircle,
  FaUpload,
  FaPaperPlane,
  FaTimes,
  FaArrowLeft,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";
import "./case.css";

// Define types for form data
interface FormData {
  caseType: string[];
  referrerFirstName: string;
  referrerLastName: string;
  companyName: string;
  city: string;
  state: string;
  phoneNumber: string;
  email: string;
  claimFileNumber: string;
  claimType: string;
  subject: string;
  address: string;
  lastFourSS: string;
  dob: string;
  dol: string;
  injury: string;
  subjectPhone: string;
  subjectEmail: string;
  employer: string;
  tpa: string;
  isRepresented: string;
  hobbies: string;
  restrictions: string;
  files: File[];
  otherCaseType: string;
}

interface CaseProps {
  isOpen: boolean;
  onClose: () => void;
}

const Case: React.FC<CaseProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState<FormData>({
    caseType: [],
    referrerFirstName: "",
    referrerLastName: "",
    companyName: "",
    city: "",
    state: "PA - Pennsylvania",
    phoneNumber: "",
    email: "",
    claimFileNumber: "",
    claimType: "",
    subject: "",
    address: "",
    lastFourSS: "",
    dob: "",
    dol: "",
    injury: "",
    subjectPhone: "",
    subjectEmail: "",
    employer: "",
    tpa: "",
    isRepresented: "",
    hobbies: "",
    restrictions: "",
    files: [],
    otherCaseType: "",
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [submitting] = useState(false);
  const [fileInputKey, setFileInputKey] = useState(0);
  const totalSteps = 4;

  // If modal is not open, don't render anything
  if (!isOpen) return null;

  const caseTypeOptions = [
    "Other",
    "Social Intelligence Reports",
    "Background Checks",
    "Medical Canvasses",
    "Surveillance",
    "Social Media Intelligence Search",
    "Gym Canvas",
    "Cell Phone Data (Loc8)",
    "Locate",
    "Brand Defense",
    "Expert Testimony",
    "Social Media Monitoring",
  ];

  const stateOptions = [
    "AL - Alabama",
    "AK - Alaska",
    "AZ - Arizona",
    "AR - Arkansas",
    "CA - California",
    "CO - Colorado",
    "CT - Connecticut",
    "DE - Delaware",
    "FL - Florida",
    "GA - Georgia",
    "HI - Hawaii",
    "ID - Idaho",
    "IL - Illinois",
    "IN - Indiana",
    "IA - Iowa",
    "KS - Kansas",
    "KY - Kentucky",
    "LA - Louisiana",
    "ME - Maine",
    "MD - Maryland",
    "MA - Massachusetts",
    "MI - Michigan",
    "MN - Minnesota",
    "MS - Mississippi",
    "MO - Missouri",
    "MT - Montana",
    "NE - Nebraska",
    "NV - Nevada",
    "NH - New Hampshire",
    "NJ - New Jersey",
    "NM - New Mexico",
    "NY - New York",
    "NC - North Carolina",
    "ND - North Dakota",
    "OH - Ohio",
    "OK - Oklahoma",
    "OR - Oregon",
    "PA - Pennsylvania",
    "RI - Rhode Island",
    "SC - South Carolina",
    "SD - South Dakota",
    "TN - Tennessee",
    "TX - Texas",
    "UT - Utah",
    "VT - Vermont",
    "VA - Virginia",
    "WA - Washington",
    "WV - West Virginia",
    "WI - Wisconsin",
    "WY - Wyoming",
  ];

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCaseTypeChange = (type: string) => {
    setFormData((prev) => ({
      ...prev,
      caseType: prev.caseType.includes(type)
        ? prev.caseType.filter((t) => t !== type)
        : [...prev.caseType, type],
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      setFormData((prev) => ({
        ...prev,
        files: [...prev.files, ...Array.from(fileList)],
      }));
    }
    setFileInputKey((prev) => prev + 1);
  };

  const handleFileRemove = (index: number) => {
    const updated = [...formData.files];
    updated.splice(index, 1);
    setFormData((prev) => ({ ...prev, files: updated }));
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const base64File = formData.files[0]
      ? await fileToBase64(formData.files[0])
      : null;

    const payload: any = {
      "case-type": formData.caseType,
      "referrer-first-name": formData.referrerFirstName,
      "referrer-last-name": formData.referrerLastName,
      "referrer-company-name": formData.companyName,
      "referrer-city": formData.city,
      "referrer-state": formData.state,
      "referrer-phone": formData.phoneNumber,
      "referrer-email": formData.email,
      "claim-number": formData.claimFileNumber,
      "claim-type": formData.claimType,
      subject: formData.subject,
      address: formData.address,
      ssn: formData.lastFourSS,
      dob: formData.dob,
      dol: formData.dol,
      injury: formData.injury,
      phone: formData.subjectPhone,
      email: formData.subjectEmail,
      employer: formData.employer,
      tpa: formData.tpa,
      represented: formData.isRepresented,
      hobbies: formData.hobbies,
      restrictions: formData.restrictions,
      attachments: base64File,
    };

    const result = await dispatch(submitWebutationForm(payload));

    if (submitWebutationForm.fulfilled.match(result)) {
      toast.success("Case submitted successfully!");
      dispatch(resetWebutationFormState());
      onClose();
    } else {
      toast.error("Failed to submit case: " + result.payload);
    }
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  };

  // Go to specific step
  const goToStep = (step: number) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step);
      window.scrollTo(0, 0);
    }
  };

  const renderProgressBar = () => {
    return (
      <div className="progress-container">
        <div className="progress-bar">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <React.Fragment key={index}>
              <div className="progress-step">
                <div
                  className={`step-indicator ${
                    currentStep >= index + 1 ? "active" : ""
                  } ${currentStep > index + 1 ? "completed" : ""}`}
                  onClick={() => goToStep(index + 1)}
                >
                  {currentStep > index + 1 ? <FaCheckCircle /> : index + 1}
                </div>
                <span>
                  {index === 0
                    ? "Case Type"
                    : index === 1
                    ? "Referrer"
                    : index === 2
                    ? "Claimant"
                    : "Files"}
                </span>
              </div>
              {index < totalSteps - 1 && <div className="progress-line"></div>}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  // Render step navigation buttons
  const renderStepNavigation = () => {
    return (
      <div className="form-navigation">
        {currentStep > 1 && (
          <button
            type="button"
            className="button button-secondary"
            onClick={prevStep}
          >
            <FaArrowLeft className="button-icon-left" /> Back
          </button>
        )}
        {currentStep < totalSteps ? (
          <button
            type="button"
            className="button button-primary"
            onClick={nextStep}
          >
            Continue <FaArrowRight className="button-icon-right" />
          </button>
        ) : (
          <button
            type="submit"
            className="button button-submit"
            disabled={submitting}
          >
            {submitting ? (
              <span className="submitting">
                <span className="spinner"></span>
                Submitting...
              </span>
            ) : (
              <span className="submit-text">
                <FaPaperPlane className="submit-icon" />
                Submit Case
              </span>
            )}
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="case-modal-overlay" onClick={onClose}>
      <div className="case-container" onClick={(e) => e.stopPropagation()}>
        <div className="case-form-wrapper">
          <button className="case-close-button" onClick={onClose}>
            <FaTimes />
          </button>
          <h1 className="case-title">Webutation Case Details</h1>

          {renderProgressBar()}

          <form onSubmit={handleSubmit} className="case-form">
            {currentStep === 1 && (
              <div className="form-step">
                <h2>Type of Case</h2>
                <p className="form-description">
                  Select all case types that apply to your situation.
                </p>

                <div className="case-types-grid">
                  {caseTypeOptions.map((type) => (
                    <div
                      key={type}
                      className={`case-type-option ${
                        formData.caseType.includes(type) ? "selected" : ""
                      }`}
                      onClick={() => handleCaseTypeChange(type)}
                    >
                      <div className="case-type-checkbox">
                        {formData.caseType.includes(type) && (
                          <span className="checkbox-selected"></span>
                        )}
                      </div>
                      <span>{type}</span>
                    </div>
                  ))}
                </div>

                {formData.caseType.includes("Other") && (
                  <div className="other-case-type">
                    <label htmlFor="otherCaseType">
                      Please specify other case type:
                    </label>
                    <input
                      type="text"
                      id="otherCaseType"
                      name="otherCaseType"
                      value={formData.otherCaseType}
                      onChange={handleInputChange}
                      placeholder="Please specify your case type here"
                    />
                  </div>
                )}

                {renderStepNavigation()}
              </div>
            )}

            {currentStep === 2 && (
              <div className="form-step">
                <h2>Referrer Information</h2>
                <p className="form-description">
                  Please provide your contact information as the case referrer.
                </p>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="referrerFirstName">
                      <FaUser className="form-icon" />
                      First Name
                    </label>
                    <input
                      type="text"
                      id="referrerFirstName"
                      name="referrerFirstName"
                      value={formData.referrerFirstName}
                      onChange={handleInputChange}
                      placeholder="Yassine"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="referrerLastName">
                      <FaUser className="form-icon" />
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="referrerLastName"
                      name="referrerLastName"
                      value={formData.referrerLastName}
                      onChange={handleInputChange}
                      placeholder="Mijane"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="companyName">
                    <FaBuilding className="form-icon" />
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="Your company"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">
                      <FaMapMarkerAlt className="form-icon" />
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Glenolden"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="state">
                      <FaMapMarkerAlt className="form-icon" />
                      State
                    </label>
                    <select
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                    >
                      {stateOptions.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phoneNumber">
                      <FaPhone className="form-icon phone-icon" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="4848025609"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">
                      <FaEnvelope className="form-icon" />
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="goldencar409@outlook.com"
                    />
                  </div>
                </div>

                {renderStepNavigation()}
              </div>
            )}

            {currentStep === 3 && (
              <div className="form-step">
                <h2>Claimant Information</h2>
                <p className="form-description">
                  If you could fill out as much of the information below that
                  would be helpful. No worries if you don't have everything,
                  we'll find the rest.
                </p>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="claimFileNumber">
                      <FaFileAlt className="form-icon" />
                      Claim or file#
                    </label>
                    <input
                      type="text"
                      id="claimFileNumber"
                      name="claimFileNumber"
                      value={formData.claimFileNumber}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="claimType">
                      <FaFileAlt className="form-icon" />
                      Type of Claim
                    </label>
                    <input
                      type="text"
                      id="claimType"
                      name="claimType"
                      value={formData.claimType}
                      onChange={handleInputChange}
                      placeholder="i.e. - W/C, GL, Auto"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="subject">
                      <FaUser className="form-icon" />
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="lastFourSS">
                      <FaFileAlt className="form-icon" />
                      Last four of SS#
                    </label>
                    <input
                      type="text"
                      id="lastFourSS"
                      name="lastFourSS"
                      maxLength={4}
                      value={formData.lastFourSS}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="address">
                      <FaMapMarkerAlt className="form-icon" />
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="409 w south ave"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="injury">
                      <FaMedkit className="form-icon" />
                      Injury
                    </label>
                    <input
                      type="text"
                      id="injury"
                      name="injury"
                      value={formData.injury}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="dob">
                      <FaCalendarAlt className="form-icon" />
                      Date of Birth
                    </label>
                    <input
                      type="text"
                      id="dob"
                      name="dob"
                      value={formData.dob}
                      onChange={handleInputChange}
                      placeholder="DD/MM/YYYY"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="dol">
                      <FaCalendarAlt className="form-icon" />
                      Date of Leave
                    </label>
                    <input
                      type="text"
                      id="dol"
                      name="dol"
                      value={formData.dol}
                      onChange={handleInputChange}
                      placeholder="DD/MM/YYYY"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="isRepresented">
                      <FaQuestionCircle className="form-icon" />
                      Is Subject represented
                    </label>
                    <select
                      id="isRepresented"
                      name="isRepresented"
                      value={formData.isRepresented}
                      onChange={handleInputChange}
                    >
                      <option value="">Select...</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                      <option value="Unknown">Unknown</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="subjectPhone">
                      <FaPhone className="form-icon phone-icon" />
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="subjectPhone"
                      name="subjectPhone"
                      value={formData.subjectPhone}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="subjectEmail">
                      <FaEnvelope className="form-icon" />
                      Email
                    </label>
                    <input
                      type="email"
                      id="subjectEmail"
                      name="subjectEmail"
                      value={formData.subjectEmail}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="employer">
                      <FaBuilding className="form-icon" />
                      Employer or insured
                    </label>
                    <input
                      type="text"
                      id="employer"
                      name="employer"
                      value={formData.employer}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="tpa">
                      <FaBuilding className="form-icon" />
                      TPA (if acceptable)
                    </label>
                    <input
                      type="text"
                      id="tpa"
                      name="tpa"
                      value={formData.tpa}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="hobbies">
                      <FaUser className="form-icon" />
                      Hobbies/Interests
                    </label>
                    <input
                      type="text"
                      id="hobbies"
                      name="hobbies"
                      value={formData.hobbies}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="restrictions">
                      <FaMedkit className="form-icon" />
                      Restrictions
                    </label>
                    <input
                      type="text"
                      id="restrictions"
                      name="restrictions"
                      value={formData.restrictions}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {renderStepNavigation()}
              </div>
            )}

            {currentStep === 4 && (
              <div className="form-step">
                <h2>Supporting Documents</h2>
                <p className="form-description">
                  Please attach any previous FROI, incident or police reports;
                  BOP's, interrogatories, etc...
                </p>

                <div className="file-upload-container">
                  <div className="file-upload-box">
                    <input
                      type="file"
                      id="fileUpload"
                      key={fileInputKey}
                      onChange={handleFileChange}
                      multiple
                      className="file-input"
                    />
                    <label htmlFor="fileUpload" className="file-upload-label">
                      <FaUpload className="upload-icon" />
                      <span>Drop files here or click to upload</span>
                    </label>
                  </div>

                  {formData.files.length > 0 && (
                    <div className="uploaded-files">
                      <h3>Uploaded Files</h3>
                      <ul className="file-list">
                        {formData.files.map((file, index) => (
                          <li key={index} className="file-item">
                            <span className="file-name">{file.name}</span>
                            <button
                              type="button"
                              className="remove-file-btn"
                              onClick={() => handleFileRemove(index)}
                            >
                              ✕
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {renderStepNavigation()}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Case;
