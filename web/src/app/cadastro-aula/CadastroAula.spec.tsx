import { render } from "@testing-library/react";
import CadastroAula from "./page";

describe("CadastroAula Component", () => {
    it("should render text", () => {
        const { getByText } = render(<CadastroAula />);

        expect(getByText("Aulas")).toBeInTheDocument();
    })
})