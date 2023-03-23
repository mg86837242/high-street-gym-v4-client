import ErrorInfo from "../components/ErrorInfo";

const profileRoutes = [
  {
    index: true,
    async lazy() {
      let { ProfileEditIndex } = await import("../components/AuthUI/ProfilePanel");
      return { Component: ProfileEditIndex };
    },
  },
  {
    path: "account",
    async lazy() {
      let { ProfileEditAccount } = await import("../components/AuthUI/ProfilePanel");
      return { Component: ProfileEditAccount };
    },
    async loader() {
      let { default: getAllLoginEmails } = await import("../services/logins");
      return getAllLoginEmails();
    },
    async action({ request }) {
      let formData = await request.formData();
      let { _action, ...values } = Object.fromEntries(formData);

      if (_action === "updateMemberById") {
        let { updateMemberById } = await import("../services/members");
        return updateMemberById(values);
      }
      if (_action === "updateAddressByMemberId") {
        let { updateAddressByMemberId } = await import("../services/address");
        return updateAddressByMemberId(values);
      }
    },
    ErrorBoundary: ErrorInfo,
  },
  {
    path: "blog",
    async lazy() {
      let { ProfileEditBlog } = await import("../components/AuthUI/ProfilePanel");
      return { Component: ProfileEditBlog };
    },
    ErrorBoundary: ErrorInfo,
  },
];

export default profileRoutes;
