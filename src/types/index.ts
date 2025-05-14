import React from "react";

export type ChildElement = {
  tag: string | React.ReactNode;
  value?: string;
  elementProps?: Record<string, unknown>;
  children?: ChildElement[];
};

export interface IResponseError {
  message: string;
  errors?: Record<string, string[]>;
}

export interface IMessageResponse {
  message: string;
}

// Profile
export interface IGetProfileResponseData {
  email: {
    value: string;
    isConfirmed: boolean;
  };
  createdAt: string;
  minecraftProfile: {
    username: string;
    uuid: string;
    createdAt: string;
  } | null;
}

// Auth
export interface ILoginResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

// OAuth
export interface IGetMicrosoftLinkResponseData {
  url: string;
}
