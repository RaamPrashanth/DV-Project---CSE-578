<%@ taglib prefix = "c" uri = "http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
<title>Twittopedia</title>
</head>
<body>
<c:set var="text" value="${text}" />
Hi <c:out value='${text}'/>
</body>
</html>