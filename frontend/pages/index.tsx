export default function Home() {
  return (
    <div>
      <div className="register">
        <h2>Register</h2>
        <form>
          <label>Mail : <input type="text" name="mail" /></label>
          <label>Password : <input type="text" name="password" /></label>
          <input type="submit" name="Submit" />
        </form>
      </div>

      <div className="login">
        <h2>Login</h2>
        <form>
          <label>Mail : <input type="text" name="mail" /></label>
          <label>Password : <input type="text" name="password" /></label>
          <input type="submit" name="Submit" />
        </form>
      </div>
    </div>
  );
}
