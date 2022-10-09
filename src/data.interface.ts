enum Gender {
  MALE = "male",
  FEMALE = "female",
  EMPTY = "",
}

export class StarWarsData {
  public name: string = "";
  public class: string = "";
  public gender: Gender = Gender.EMPTY;
  public image: string = "";
  public species: string = "";
  public eyeColor: string = "";
  public height: string = "";
  public homeworld: string = "";
  public affiliations: string[] = [""];
}
