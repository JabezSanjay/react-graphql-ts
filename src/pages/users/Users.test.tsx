import { render, waitFor, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { GET_USERS } from "../../graphql/queries/users";
import Users from "./index";
import "@testing-library/jest-dom";

const mocks = [
  {
    request: {
      query: GET_USERS,
    },
    result: {
      data: {
        Users: [
          {
            email: "johndoe@example.com",
            isVerified: true,
            userName: "John Doe",
            id: "1",
          },
          {
            email: "janedoe@example.com",
            isVerified: false,
            userName: "Jane Doe",
            id: "2",
          },
        ],
      },
    },
  },
];

describe("Users", () => {
  it("should render loading state initially", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Users />
      </MockedProvider>
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    });
  });

  it("should render error state if there is an error", async () => {
    const errorMock = {
      request: {
        query: GET_USERS,
      },
      error: new Error("Something went wrong"),
    };

    render(
      <MockedProvider mocks={[errorMock]} addTypename={false}>
        <Users />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });

  it("should render users when the query is successful", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Users />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("johndoe@example.com")).toBeInTheDocument();
      expect(screen.getByText("janedoe@example.com")).toBeInTheDocument();
    });
  });
});
