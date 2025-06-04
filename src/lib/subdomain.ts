




export function getSubdomain(req: any) {
  const host = req.headers.get('host') || "";
  const subdomain = host.split('.')[0];
  console.log(subdomain)

  return subdomain;
}
