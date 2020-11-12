import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import i18n from "locales/i18n";
import LanguageSelection from "components/language/LanguageSelection";

describe("LanguageSelection", () => {
  render(<LanguageSelection />);
  const changeLangStub = jest
    .spyOn(i18n, "changeLanguage")
    .mockImplementation((lang) => lang);

  test("renders correctly", () => {
    expect(screen.getByText(/fr/i)).toBeInTheDocument();
    userEvent.selectOptions(screen.getByRole("combobox"), "en");
    expect(changeLangStub.mock.calls[0][0]).toBe("en");
    userEvent.selectOptions(screen.getByRole("combobox"), "es");
    expect(changeLangStub.mock.calls[1][0]).toBe("es");
  });
});
