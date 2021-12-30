import { Profile } from "passport-github";
import { Profile as GProfile } from "passport-google-oauth20";
import { Profile as FBProfile } from "passport-facebook";

export interface GithubProfile extends Profile {
  _json: {
    [key: string]: string;
  };
}

export interface GoogleUserProfile extends GProfile {}
export interface FacebookUserProfile extends FBProfile {}
